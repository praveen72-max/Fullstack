const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const tools = [
  { id:1, name:'JSON Formatter', desc:'Paste JSON to pretty-print', link:'https://jsonformatter.curiousconcept.com/' },
  { id:2, name:'Image Compressor', desc:'Compress images quickly', link:'https://squoosh.app/' },
  { id:3, name:'Dummy API', desc:'Sample API — returns sample JSON', link:'#' }
]

app.get('/api/tools', (req,res)=>{
  res.json(tools)
})

app.get('/health', (req,res)=>res.send('ok'))

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log('Backend listening on', port))