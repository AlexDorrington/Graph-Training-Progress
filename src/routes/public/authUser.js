const path = require('path')

const router = require('express').Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

const {isValidReg} = require('../validate/register')
const {UserModel} = require(path.join(__dirname, '../../', 'model', 'User.js'))
const publicViews = path.join(__dirname + '/../../views/public')



//RENDER HOME PAGE
router.get('/', (req, res, next) => {
    res.sendFile(`${publicViews}/index.html`)
})


//REGISTER USER
router.post('/register', async (req, res, next) => {
    try {
        const isValid = await isValidReg(req.body)
        if (!isValid) {
            return res.redirect('/home')
        }
        const {firstname, surname, email, password} = req.body
        const hashPassword = await bcrypt.hash(password, 8)
        const newUser = new UserModel({
            firstname,
            surname,
            email,
            password: hashPassword
        })
        await newUser.save()
        return res.redirect('/home')
    } catch (err) {
        res.status(400).send({
            err: err.message,
            info: 'Error in registering'

        })
    }
})


//LOGIN USER
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/home'
}))

module.exports = {
    authRoutes: router
}