let activeDateBtn;

const calendar = [
    ['January', 31],
    ['February', 28],
    ['March', 31],
    ['April', 30],
    ['May', 31],
    ['June', 30],
    ['July', 31],
    ['August', 31],
    ['September', 30],
    ['October', 31],
    ['November', 30],
    ['December', 31]
]


//RENDER DAYS PER MONTH BUTTONS IN DIV
const monthBtnsDiv = document.getElementById('monthBtns')
const daysContainer = document.getElementById('daysContainer')
const daysDataContainer = document.getElementById('daysDataContainer')

monthBtnsDiv.addEventListener('click', ({target}) => {
    const btnMonthName = target
    daysContainer.innerHTML = ''
    if (btnMonthName.classList.contains('activeMonth')) {
        daysDataContainer.style.display = 'none'
        btnMonthName.classList.remove('activeMonth')
        return;
    }
    renderBtnsStatus(btnMonthName)
    returnNoOfDays(btnMonthName.name, (day, month) => {
        const newDayBtn = document.createElement('button')
        newDayBtn.name = `${month}${day}`
        newDayBtn.classList.add('dayBtn')
        newDayBtn.innerHTML = day
        daysContainer.appendChild(newDayBtn)
        newDayBtn.addEventListener('click', (e) => {
            daysDataContainer.style.display = 'block'
            activeDateBtn = e.target.name
            findExistingData(activeDateBtn)
        })
    })
})

const renderBtnsStatus = (activeBtn) => {
    const monthBtns = Array.from(document.querySelectorAll('.month'))
    for (let btn of monthBtns) {
        btn.classList.remove('activeMonth')
    }
    activeBtn.classList.add('activeMonth')
}

const returnNoOfDays = (btnName, cb) => {
    const btnMonth = btnName
    const monthFromCalendarArray = calendar.find((month) => month[0].toLowerCase() == btnMonth)
    let i = 1;
    do {
        cb(i, btnMonth)
        i++
    } while (i <= monthFromCalendarArray[1])
}


//RETRIEVE EXISTING DATA IF EXISTS - Add btn name to search through json for match?
const findExistingData = async (date) => {
    const foundData = await fetch(`http://localhost:3000/exercises/retrieve/${date}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await foundData.json()
    if (data.length > 0) {
        //const {squats, bench, shoulder, deadlift} = data[0]
        renderTableRepData(data)
        return
    }
    return console.log('No existing data')
}

// const squatRepsInput = document.getElementById('squatReps')
// const benchRepsInput = document.getElementById('benchReps')
// const shoulderRepsInput = document.getElementById('shoulderReps')
// const deadliftRepsInput = document.getElementById('deadliftReps')

// const exerciseRepsArray = [squatRepsInput, benchRepsInput, shoulderRepsInput, deadliftRepsInput]


//SAVE EXERCISE DATA - SEND TO JSON FILE
class Exercises {
    constructor(squatReps, benchReps, shoulderReps, deadliftReps, squatWeight, benchWeight, shoulderWeight, deadliftWeight) {
        this.squatReps = squatReps,
        this.benchReps = benchReps,
        this.shoulderReps = shoulderReps,
        this.deadliftReps = deadliftReps,
        this.squatWeight = squatWeight,
        this.benchWeight = benchWeight,
        this.shoulderWeight = shoulderWeight,
        this.deadliftWeight = deadliftWeight
    }
    reps = () => {
        const user = this
        return{
            squatReps: user.squatReps,
            benchReps: user.benchReps,
            shoulderReps: user.shoulderReps,
            deadliftReps: user.deadliftReps
        }
    }
    weight = () => {
        const user = this
        return({
            squatWeight: user.squatWeight,
            benchWeight: user.benchWeight,
            shoulderWeight: user.shoulderWeight,
            deadliftWeight: user.deadliftWeight
        })
    }
    max = () => {
        const user = this
        return({
            squatMax: user.squatReps * user.squatWeight,
            benchMax: user.benchReps * user.benchWeight,
            shoulderMax: user.shoulderReps * user.shoulderWeight,
            deadliftMax: user.deadliftReps * user.deadliftWeight
        })
    }
}

saveBtn.addEventListener('click', async () => {
    const {reps, weight, max} = new Exercises(500, 300)
    renderRepMax(max)
    fetch(`http://localhost:3000/exercises`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dateBtn: activeDateBtn,
            id: Date.now(),
            squats: {
                reps: reps().squatReps,
                weight: weight().squatWeight,
                maxRep: max().squatMax
            },
            bench: {
                reps: reps().benchReps,
                weight: weight().benchWeight,
                maxRep: max().benchMax
            },
            shoulder: {
                reps: reps().shoulderReps,
                weight: weight().shoulderWeight,
                maxRep: max().shoulderMax
            },
            deadlift: {
                reps: reps().deadliftReps,
                weight: weight().deadliftWeight,
                maxRep: max().deadliftMax
            }
        })
    })
})

const squatMaxInput = document.getElementById('squatMax')
const benchMaxInput = document.getElementById('benchMax')
const shoulderMaxInput = document.getElementById('shoulderMax')
const deadliftMaxInput = document.getElementById('deadliftMax')

const renderRepMax = (calcMax) => {
    squatMaxInput.value = calcMax().squatMax
    benchMaxInput.value = calcMax().benchMax
    shoulderMax.value = calcMax().shoulderMax
    deadliftMaxInput.value = calcMax().deadliftMax
}