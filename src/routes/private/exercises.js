const path = require('path')
const fs = require('fs')

const router = require('express').Router()

const exerciseData = path.join(__dirname + '/../../database/exerciseData.json')

const {ensureAuth} = require('../../auth/passport')


router.get('/', ensureAuth, (req, res, next) => {
    res.sendFile(`exercises.html`, {
        root: __dirname + '/../../views/private'
    })
})

//RETRIEVE ALL DATS WITH EXISTING DATA
router.get('/retrieveExist', ensureAuth, async (req, res, next) => {
    const userID = req.user.id
    try {
        fs.readFile(exerciseData, async (err, data) => {
            if (err) {
                return res.json({
                    err: 'No data found'
                })
            }
            const fileData = await JSON.parse(data)
            const userData = await fileData.filter((item) => item.user == userID)
            res.json(userData)
        })
    } catch (err) {
        console.log(err)
    }
})

//RETRIEVE ANY DATA FOR SINGLE EXISTING DATE
router.get('/retrieve/:date', async (req, res, next) => {
    const userID = req.user.id
    const date = req.params.date
    try {
        fs.readFile(exerciseData, async (err, data) => {
            if (err) {
                console.log('No file found')
                return res.json([])
            }
            const fileData = await JSON.parse(data)
            const match = await fileData.filter((item) => item.user == userID && item.dateBtn == date)
            if (!match) {
                return res.json([])
            }
            res.json(match)
        })
    } catch (err) {
        console.log(err)
    }
})

//SAVE NEW DATA FOR SINGLE DATE
router.post('/', ensureAuth, async (req, res, next) => {
    const userID = req.user.id
    let newExerciseData = Object.assign(req.body)
    newExerciseData.user = userID
    try {
        fs.readFile(exerciseData, async (err, data) => {
            if (err) {
                fs.writeFile(exerciseData, JSON.stringify([newExerciseData]), () => {
                    console.log('File created')
                })
                return res.json(newExerciseData)
            }
            const fileData = await JSON.parse(data)
            fileData.push(newExerciseData)
            fs.writeFile(exerciseData, JSON.stringify(fileData), () => {
                console.log('New exercise data added')
            })
            res.json(fileData)
        })
    } catch (err) {
        console.log(err)
    }
})


//DELETE DATA FOR SINGLE DATE
router.delete('/remove/:date', ensureAuth, async (req, res, next) => {
    const userID = req.user.id
    const dateToDelete = req.params.date
    try {
        fs.readFile(exerciseData, async (err, data) => {
            if (err) {
                console.log('No file found')
                return res.json([])
            }
            const fileData = await JSON.parse(data)
            const valInArray = await fileData.filter((item) => {
                return item.user == userID
            }).findIndex((item) => {
                return item.dateBtn == dateToDelete
            })
            if (valInArray < 0) {
                console.log('No data found')
                return res.json({
                    err: 'No data found'
                })
            }
            const dataDeleted = await fileData.splice(valInArray, 1)
            fs.writeFile(exerciseData, JSON.stringify(fileData), () => {
                console.log('Data deleted')
            })
            res.json(dataDeleted)
        })
    } catch (err) {
        console.log(err)
    }
})


module.exports = {
    exercisesRoute: router
}