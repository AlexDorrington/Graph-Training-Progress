const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const {UserModel} = require('../model/User')


const newStrategy = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        const user = await UserModel.findOne({
            email: username
        })
        if (!user) {
            return done(null, false)
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return done(null, false)
        }
        return done(null, user)
    }))
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        UserModel.findById(id, (err, user) => {
            done(err, user)
        })
    })
}


const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/home')
}


module.exports = {
    ensureAuth,
    newStrategy
}