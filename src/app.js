const express = require('express');
const app = express();
const port = 3000;

var bodyParser = require('body-parser')
// parse application/json
app.use(bodyParser.json())

const books =[
    {id:1, title:"learning Java"},
    {id:2, title:"learning Web"},
    {id:3, title:"learning Python"},
]
//check ID
function checkID(req, res, next){
    const id = req.params.id
    const book = books.find((item) => {
        return item.id == id
    })
    if(!book){
        return res.status(404).json({
            error:"Fond found"
        })
    }
    next()

}

//get all books
// app.get('/books', (function (req, res) {
//     console.log(req.query)
//     // Pass req query to database
//     return res.json(books)
// }))

//get book by id
// app.get('/books/:id', checkID,(req, res) => {
//     const id = req.params.id
//     const book = books.find((item) => {
//         return item.id == id
//     })
    
//     return res.json(book)
//   });

  //add new book

//   app.post('/books', (req, res) => {
//     const newBook = {
//         id: req.body.id,
//         title: req.body.title,
//     }
//     const exist = books.some((item) => {
//         return item.id == newBook.id
//     })
//     if (exist) {
//         return res.status(400).json({
//             message: "Books ID already existt"
//         })
//     }
//     books.push(newBook)
//     return res.json({
//         operation: "Success",
//         item: newBook
//     })

// })
//delet book by checking id
app.delete('/books/:id', (req, res) => {
    const id = req.params.id
    const book = books.find((item) => {
        return item.id == id
    })
    if (book) {
        const index = books.findIndex((item) => {
            return item == book
        })
        console.log(index)
        books.splice(index, 1)
        return res.json({
            operation: "deleted",
            item: book
        })
    }
    return res.json("book not found")
})


//Edit book by id
app.put('/books/:id', checkID,(req, res) => {
    const editBook = {
        title: req.body.title,
    }
    const id = req.params.id
    const book = books.find((item) => {
        return item.id == id
    })
    if (book) {
       
    
        book.title= editBook.title
        return res.json({
            operation: "update",
            item: book
        })
    }
    return res.json("book not found")
  });


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  
