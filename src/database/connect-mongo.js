const mongoose = require('mongoose')
const dotenv = require('dotenv')


dotenv.config({
    path: __dirname + '/../.env'
})



mongoose.connect(process.env.databaseURL, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected')
}).catch(err => {
    return console.log(err)
})