let activeDateBtn;

const calendar = [
    ['0', 31],
    ['1', 28],
    ['2', 31],
    ['3', 30],
    ['4', 31],
    ['5', 30],
    ['6', 31],
    ['7', 31],
    ['8', 30],
    ['9', 31],
    ['10', 30],
    ['11', 31]
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
        newDayBtn.name = `${month}-${day}`
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
    const monthFromCalendarArray = calendar.find((month) => month[0] == btnMonth)
    let i = 1;
    do {
        i < 10 ? i = `${0}${i}` : i
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
        renderTableRepData(data)
        return
    }
    return console.log('No existing data')
}

const renderTableRepData = (data) => {
    const {squats, bench, shoulder, deadlift} = data[0]
    const exerciseKeys = Object.keys(data[0])
    console.log(data[0])
}


//SAVE EXERCISE DATA - SEND TO JSON FILE
const squatRepInput = document.getElementById('squatReps')
const squatWeightInput = document.getElementById('squatWeight')
const benchRepInput = document.getElementById('benchReps')
const benchWeightInput = document.getElementById('benchWeight')
const shoulderRepInput = document.getElementById('shoulderReps')
const shoulderWeightInput = document.getElementById('shoulderWeight')
const deadliftRepInput = document.getElementById('deadliftReps')
const deadliftWeightInput = document.getElementById('deadliftWeight')

saveBtn.addEventListener('click', () => {
    const saveSuccessMsg = document.getElementById('saveSuccessMsg')
    const saveErrorMsg = document.getElementById('saveErrorMsg')
    const isValidSave = checkInputsOnSave()
    if (!isValidSave) {
        saveSuccessMsg.style.display = 'none'
        saveErrorMsg.style.display = 'block'
        return console.log('Invalid save attempt')
    }
    saveErrorMsg.style.display = 'none'
    saveSuccessMsg.style.display = 'block'
    saveNewData()
})

const checkInputsOnSave = () => {
    const emptyInputs = []

    squatRepInput.value && !squatWeightInput.value 
    || !squatRepInput.value && squatWeightInput.value 
    ? emptyInputs.push({err: 'Error in squat input fields'})
    : false

    benchRepInput.value && !benchWeightInput.value 
    || !benchRepInput.value && benchWeightInput.value 
    ? emptyInputs.push({err: 'Error in bench input fields'})
    : false

    shoulderRepInput.value && !shoulderWeightInput.value 
    || !shoulderRepInput.value && shoulderWeightInput.value 
    ? emptyInputs.push({err: 'Error in shoulder input fields'})
    : false

    deadliftRepInput.value && !deadliftWeightInput.value 
    || !deadliftRepInput.value && deadliftWeightInput.value 
    ? emptyInputs.push({err: 'Error in deadlift input fields'})
    : false

    return emptyInputs.length > 0 ? false : true
}

const saveNewData = () => {
    fetch(`http://localhost:3000/exercises`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dateBtn: activeDateBtn,
            id: Date.now(),
            squats: {
                reps: squatRepInput.value,
                weight: squatWeightInput.value,
                // maxRep: max().squatMax
            },
            bench: {
                reps: benchRepInput.value,
                weight: benchWeightInput.value,
                //maxRep: max().benchMax
            },
            shoulder: {
                reps: shoulderRepInput.value,
                weight: shoulderWeightInput.value,
                //maxRep: max().shoulderMax
            },
            deadlift: {
                reps: deadliftRepInput.value,
                weight: deadliftWeightInput.value,
                //maxRep: max().deadliftMax
            }
        })
    })
}