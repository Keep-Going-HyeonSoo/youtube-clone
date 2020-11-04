import express from 'express'
const app = express()

const PORT = 4000

const handleListening = () =>
  console.log(`Listening in ${PORT} port!`)

const handleHome = (req, res) => {
  res.send('Hello from Home!')
}

const handleProfile = (req, res) => {
  res.send('You are on my profile')
}

// MiddleWare
const betweenHome = (req, res, next) => {
  console.log('Between')
  next()
}

app.use(betweenHome)

app.get('/', handleHome)
app.get('/profile', handleProfile)

app.listen(PORT, handleListening)
