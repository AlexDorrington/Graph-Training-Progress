const path = require('path')

const router = require('express').Router()

const {ensureAuth} = require('../../auth/passport')
const privateViews = path.join(__dirname + '/../../views/private')


router.get('/', ensureAuth, (req, res, next) => {
    res.sendFile(`${privateViews}/exercises.html`)
})


module.exports = {
    exercisesRoute: router
}