const path = require('path')
const fs = require('fs')

const router = require('express').Router()

const {ensureAuth} = require(path.join(__dirname, '../../', 'auth', 'passport.js'))
const privateViews = path.join(__dirname + '/../../views/private')
const weightData = path.join(__dirname + '/../../database/weightData.json')



router.get('/', ensureAuth, (req, res, next) => {
    res.sendFile(`${privateViews}/dashboard.html`)
})


//GET USER WEIGHT DATA
router.get('/weight', (req, res, next) => {
    try {
        fs.readFile(weightData, async (err, data) => {
            if (err) {
                console.log('No file found')
                return res.json([])
            }
            const fileData = await JSON.parse(data)
            const userData = await fileData.filter((data) => {
                return data.user == req.user.id
            })
            res.status(200).json(userData)
        })
    } catch (err) {
        console.log(err)
    }
})


//POST BODYWEIGHT DATA
router.post('/weight', ensureAuth, (req, res, next) => {
    const userID = req.user.id
    let newWeight = Object.assign(req.body);
    newWeight.user = userID
    try {
        fs.readFile(weightData, async (err, data) => {
            if (err) {
                fs.writeFile(weightData, JSON.stringify([newWeight]), () => {
                    console.log('File created')
                })
                return res.json(newWeight)
            }
            const fileData = await JSON.parse(data)
            fileData.push(newWeight)
            fs.writeFile(weightData, JSON.stringify(fileData), () => {
                console.log('New weight added')
            })
            res.json(fileData)
        })
    } catch (err) {
        console.log(err)
    }
})


//EDIT EXISTING BODY WEIGHT DATA BY ID
router.patch('/weight/:id', (req, res, next) => {
    console.log(req.params.id)
})


//DELETE EXISTING BODY WEIGHT DATA BY ID
router.delete('/weight/:id', async(req, res, next) => {
    const deleteID = req.body.dataID
    
    try {
        fs.readFile(weightData, async (err, data) => {
            if (err) {
                return console.log('No file found')
            }
            const fileData = await JSON.parse(data)
            const valInArray = await fileData.findIndex((item) => {
                return item.dataID == deleteID
            })
            await fileData.splice(valInArray, 1)
            fs.writeFile(weightData, JSON.stringify(fileData), () => {
                console.log('Weight data deleted')
            })
        })
    } catch (err) {
        console.log(err)
    }
})



module.exports = {
    authorisedRoutes: router
}