const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config')
const authRouter = require('./routes/auth.routes')

const app = express()
const PORT = config.get('PORT')

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(config.get('MONGO_URI'))

        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`)
        })
    } catch(error) {
        console.log('При запуске сервера произошла ошибка: ', error)
    }
}

start()
