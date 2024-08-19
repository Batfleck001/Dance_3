const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())


let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
      },
      {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
      },
      {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: false
      }
]

app.get('/',(req,res) =>{
    res.send("<h1>Hello World</h1>")
})
app.get('/api/notes',(req,res)=>{
  res.send(notes)
})
// app.get('/api/notes/:id', (req,res) => {
//   const id = Number(req.params.id)
//   const note = notes.find(note => note.id === id)
//   if(note){
//   res.send(note)
//   }else{
//     res.status(404).end()
//   }
// })

// app.get('/api/notes/:id',(req,res)=>{
//   const id = Number(req.params.id)
//   notes = notes.filter(val => val.id !== id)
//   res.status(204).end()
// })
// For delete

// app.delete('/api/notes/:id',(req,res) => {
//   const id = Number(req.params.id)
//   notes = notes.filter(val => val.id !== id)
//   console.log("Deletion is activated")
//   res.status(204).end("deleted")
// })

//For Post

app.use(express.json())
// app.post('/api/notes',(req,res) => {
//   const note = req.body
//   res.json(note)
//   console.log(note)
//   console.log(req.headers)
// })

const generateId = () =>{
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => Number(n.id))) : 0
  return String(maxId+1)
}
app.post('/api/notes',(req,res)=>{
  
  const body = req.body

  if(!body.content){
    return res.status(400).end({
      error : "Content missing"
    })
  }
  const note = {
      content : body.content,
      important : Boolean(body.important) || false,
      id : generateId()
  }

  notes = notes.concat(note)
  res.json(note)
  }
)



const port = 3001
app.listen(port, () => {
console.log(`Server @ ${port}`)})