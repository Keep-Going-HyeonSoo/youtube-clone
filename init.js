import app from './app'
import './db'

const PORT = 3000

const handleListening = () => console.log(`💙 Listening on PORT ${PORT}`)

app.listen(PORT, handleListening)
