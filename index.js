const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// AaAAaaaAaAaAaA

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})