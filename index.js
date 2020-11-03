const express = require('express')
const app = express()

PORT = 4000

function handleListening() {
    console.log('Listening in 4000 port!')
}

app.listen(PORT, handleListening)
