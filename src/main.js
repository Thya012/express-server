require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { handleError, cacheMiddleware, 
    cacheInterceptor, invalidateInterceptor, 
    verifyJWT } = require('./middlewares/index.js')

const PORT = process.env.PORT
const passport = require('passport')

const dbConnect = require('./db/db.js')
const bookRouter = require('./routes/book.js')
const courseRouter = require('./routes/course.js')
const userRouter = require('./routes/user.js')
const authRouter = require('./routes/auth.js')
const jwtStrategy = require('./common/stragegy/jwt.js')
const redisClient = require('./redis/index.js')
const fileRouter = require('./routes/file.js')
const rateLimit = require('express-rate-limit')
const { RedisStore } = require('rate-limit-redis')

const { createServer } = require('node:http');
//const { join } = require('node:path');
const path = require('node:path');
const { Server } = require("socket.io");
const ChatModel = require('./models/chat.js')
const ChatRouter = require('./routes/chat.js')
const { Redis } = require('ioredis')
const cors = require('cors')

const { createAdapter } = require("@socket.io/redis-adapter");
const setupSwagger = require('./swagger/index.js');


//ssl for host
// const https = require("https");
// const fs = require("fs");
// const key = fs.readFileSync('./src/cert/localhost.decrypted.key');

// const cert = fs.readFileSync('./src/cert/localhost.crt');
//const server = https.createServer({ key, cert }, app);

const app = express()


const pubClient = new Redis({
    port: 6379, // Redis port
    host: process.env.CACHE_SERVER, // Redis host
});
const subClient = pubClient.duplicate();
app.use(cors())

//ceate server
const server = createServer(app, (req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        /** add other headers as per requirement */
    }

    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers)
        res.end()
        return
    }

    if (['GET', 'POST'].indexOf(req.method) > -1) {
        res.writeHead(200, headers)
        // console.log("Hello World")
        res.end('Hello World')
        return
    }

    res.writeHead(405, headers)
    res.end(`${req.method} is not allowed for the request.`)
});

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

app.use(express.static(path.join(__dirname, '../frontend/dist')));
// protocol: http, express
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist'))
})
app.use('/health-check', (req, res) => {
    return res.status(200).json({ msg: "Up" })
})
// protocal: websocket, socket.io
io.on('connection', (socket) => {
    console.log(`${socket.id} connected `)
    socket.on('send-message', async (payload) => {
        
        console.log(payload)
        //validate payload
        const chat = new ChatModel({
            byUser: payload.id,
            text: payload.text
        })
        await chat.save()
        await chat.populate('byUser')
        // Recieve
        // Save chat to DB
        io.emit('re-message', chat)
    })
})


// const asyncHandler = require('express-async-handler')


dbConnect().catch((err) => {
    console.log(err)
})
//connect redis
//redisClient.connect()
// Define the rate limit rule
const limiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 30, // Limit each IP to 100 requests per windowMs
    message: {msg:'Too many requests from this IP, please try again later.'}
  })

  const loginLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 100 requests per windowMs
    message: {msg:'Too many Login'}
  })


passport.use(jwtStrategy)
// app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
//app.use(logger)


app.use('/v1/auth', authRouter)

app.use('/v1/chats', ChatRouter)
//limit log
//app.use(limiter)
app.use('/v1/files',passport.authenticate('jwt', { session: false }), fileRouter)

//check authenticate login
//app.use(passport.authenticate('jwt', { session: false }))
//Redis Cache
// app.use(cacheMiddleware)
// app.use(cacheInterceptor(30*20))
// app.use(invalidateInterceptor)

// Cachable Routes
app.use('/v1/courses',
    passport.authenticate('jwt', { session: false }),
    cacheMiddleware,
    cacheInterceptor(3 * 60),
    invalidateInterceptor,
    courseRouter)
app.use('/v1/books',
    passport.authenticate('jwt', { session: false }),
    cacheMiddleware,
    cacheInterceptor(3 * 60),
    invalidateInterceptor,
    bookRouter)
app.use('/v1/users',
    passport.authenticate('jwt', { session: false }),
    cacheMiddleware,
    cacheInterceptor(3 * 60),
    invalidateInterceptor,
    userRouter)
app.use(handleError)

setupSwagger(app)


app.use(handleError)


server.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`)
})
