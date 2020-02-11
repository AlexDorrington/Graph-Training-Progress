const express = require('express')
const passport = require('passport')
const session = require('express-session')

require('./database/connect-mongo')

const {authRoutes} = require('./routes/public/authUser')
const {authorisedRoutes} = require('./routes/private/dashboard')

const {newStrategy} = require('./auth/passport')
newStrategy(passport)

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.static('src/public'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(session({
    secret: 'secretToken',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/home', authRoutes)
app.use('/dashboard', authorisedRoutes)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})