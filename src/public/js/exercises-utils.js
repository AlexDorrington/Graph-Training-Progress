//ENABLE INPUT INTO TABLE CELLS ON EDIT BUTTON CLICK
const editBtn = document.getElementById('editBtn')
const deleteBtn = document.getElementById('deleteBtn')
const saveBtn = document.getElementById('saveBtn')

const toggleInputState = () => {
    changeBtnVisual()
    const allInputFields = Array.from(document.querySelectorAll('.statInput'))
    for (let input of allInputFields) {
        input.disabled = !input.disabled
    }
}

editBtn.addEventListener('click', toggleInputState)


//VISUAL OF ACTIVE EDIT BUTTON
const actionBtns = [deleteBtn, saveBtn]

const changeBtnVisual = () => {
    for (let btn of actionBtns) {
        btn.disabled = !btn.disabled
        btn.classList.toggle('inactiveBtn')
    }
}


//RENDER VISUAL TO DAY BUTTONS WITH EXISTING DATA
const showHaveExistingData = async () => {
    const data = await fetch(`http://localhost:3000/exercises/retrieveExist`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const jsonData = await data.json()
    exerciseData = jsonData
    const dayBtns = Array.from(document.querySelectorAll('.dayBtn'))
    for (let data of jsonData) {
        dayBtns.forEach((btn) => {
            if (btn.name == data.dateBtn) {
                btn.classList.add('existingDataBtn')
            }
        })
    }
}


//HIDE AND SHOW CHARTS
const squatChartBtn = document.getElementById('squatChartBtn')
const benchChartBtn = document.getElementById('benchChartBtn')
const shoulderChartBtn = document.getElementById('shoulderChartBtn')
const deadliftChartBtn = document.getElementById('deadliftChartBtn')

const displaySquatChart = document.getElementById('displaySquatChart')
const displayBenchChart = document.getElementById('displayBenchChart')
const displayShoulderChart = document.getElementById('displayShoulderChart')
const displayDeadliftChart = document.getElementById('displayDeadliftChart')

const chartBtns = [squatChartBtn, benchChartBtn, shoulderChartBtn, deadliftChartBtn]
const charts = [displaySquatChart, displayBenchChart, displayShoulderChart, displayDeadliftChart]

chartBtns[0].addEventListener('click', () => {
    for (let i = 0; i < chartBtns.length; i++) {
        if (i === 0) {
            chartBtns[i].classList.remove('inactiveChartBtn')
            chartBtns[i].classList.add('activeChartBtn')
            charts[i].style.display = 'block'
        } else {
            chartBtns[i].classList.remove('activeChartBtn')
            chartBtns[i].classList.add('inactiveChartBtn')
            charts[i].style.display = 'none'
        }
    }
})
chartBtns[1].addEventListener('click', () => {
    for (let i = 0; i < chartBtns.length; i++) {
        if (i === 1) {
            chartBtns[i].classList.remove('inactiveChartBtn')
            chartBtns[i].classList.add('activeChartBtn')
            charts[i].style.display = 'block'
        } else {
            chartBtns[i].classList.remove('activeChartBtn')
            chartBtns[i].classList.add('inactiveChartBtn')
            charts[i].style.display = 'none'
        }
    }
})
chartBtns[2].addEventListener('click', () => {
    for (let i = 0; i < chartBtns.length; i++) {
        if (i === 2) {
            chartBtns[i].classList.remove('inactiveChartBtn')
            chartBtns[i].classList.add('activeChartBtn')
            charts[i].style.display = 'block'
        } else {
            chartBtns[i].classList.remove('activeChartBtn')
            chartBtns[i].classList.add('inactiveChartBtn')
            charts[i].style.display = 'none'
        }
    }
})
chartBtns[3].addEventListener('click', () => {
    for (let i = 0; i < chartBtns.length; i++) {
        if (i === 3) {
            chartBtns[i].classList.remove('inactiveChartBtn')
            chartBtns[i].classList.add('activeChartBtn')
            charts[i].style.display = 'block'
        } else {
            chartBtns[i].classList.remove('activeChartBtn')
            chartBtns[i].classList.add('inactiveChartBtn')
            charts[i].style.display = 'none'
        }
    }
})