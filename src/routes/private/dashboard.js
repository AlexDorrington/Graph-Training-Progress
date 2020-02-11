const path = require('path')

const router = require('express').Router()

const {ensureAuth} = require(path.join(__dirname, '../../', 'auth', 'passport.js'))
const privateViews = path.join(__dirname + '/../../views/private')



router.get('/', ensureAuth, (req, res, next) => {
    console.log(req.user)
    res.sendFile(`${privateViews}/dashboard.html`)
})


//POST BODYWEIGHT DATA
router.post('/weight', (req, res, next) => {
    console.log(req.body)
})



module.exports = {
    authorisedRoutes: router
}