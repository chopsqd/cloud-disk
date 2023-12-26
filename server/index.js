const express = require('express')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config')
const authRouter = require('./routes/auth.routes')
const fileRouter = require('./routes/file.routes')

const app = express()
const PORT = config.get('PORT')

app.use(cors())
app.use(fileUpload({
    defCharset: 'utf8',
    defParamCharset: 'utf8'
}));
app.use(express.json())
app.use(express.static('static'))
app.use("/api/auth", authRouter)
app.use("/api/file", fileRouter)

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
