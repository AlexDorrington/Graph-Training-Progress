const express = require('express')
const passport = require('passport')
const session = require('express-session')

require('./database/connect-mongo')

const {authRoutes} = require('./routes/public/authUser')
const {dashboardRoutes} = require('./routes/private/dashboard')
const {exercisesRoute} = require('./routes/private/exercises')

const {ensureAuth} = require('./auth/passport')
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
app.use('/dashboard', dashboardRoutes)
app.use('/exercises', exercisesRoute)

//DEFAULT FOR UNDECLARED ROUTES
app.use('/*', ensureAuth, (req, res, next) => {
        res.sendFile('dashboard.html', {
            root: __dirname + '/views/private'
        })
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})