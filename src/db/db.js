const mongoose = require('mongoose');
const dbName = process.env.DB_NAME
const dbCotainer = 'mymongodb'
// MongoDB connection URI
const mongoURI = `mongodb://${dbCotainer}:27017`;

async function dbConnect() {
    mongoose.connection.on('connected', () => {
        console.log("Connected: ", dbCotainer)
    })
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
        dbName: dbName
})
}
module.exports = dbConnect

