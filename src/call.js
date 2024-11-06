const express = require('express');
const app = express();
const port = 3000;

const asyncHandler = require('express-async-handler');

var bodyParser = require('body-parser')
// parse application/json
app.use(bodyParser.json())
app.use(logger)

const courses =[
    {id:1, title:"Java"},
    {id:2, title:"Web"},
    {id:3, title:"Python"},
]


//handle error


app.get('/myTest', asyncHandler(async (req, res, next) => {
  throw new Error('Something went wrong asynchronously!');
}));


//post to myTitle all
app.post('/myTitle', (req, res) => {
   
    console.log(req.body);
    res.json(req.body)
  });
  

//Middle ware






app.get('/myTitle',logger, (req, res) => {
    console.log(req.query);
  res.send('student in class');
});
//middleware check by ID
function checkID(req, res, next){
    const id = req.params.id
    const course = courses.find((item) => {
        return item.id == id
    })
    if(!course){
        return res.status(404).json({
            error:"Fond found"
        })
    }
    next()

}

// by id
app.get('/books/:id', checkID,(req, res) => {
    const id = req.params.id
    const book = books.find((item) => {
        return item.id == id
    })
    
    return res.json(book)
  });





app.get('/api', (req, res) => {
  res.json({
    message:"សួរស្តី"
  })
});


app.use(handleError)
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});