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

const chartBtns = [squatChartBtn, benchChartBtn, shoulderChartBtn, deadliftChartBtn]

chartBtns.forEach((btn) => {
    let targetBtn;
    btn.addEventListener('click', (e) => {
        switch (e.target.id) {
            case 'squatChartBtn':
                targetBtn = 0;
                break;
            case 'benchChartBtn':
                targetBtn = 1;
                break;
            case 'shoulderChartBtn':
                targetBtn = 2;
                break;
            case 'deadliftChartBtn':
                targetBtn = 3;
                break;
        }
        for (let i = 0; i < chartBtns.length; i++) {
            if (i === targetBtn) {
                chartBtns[i].classList.remove('inactiveChartBtn')
                chartBtns[i].classList.add('activeChartBtn')
                chartSelection = chartBtns[i].getAttribute('data-chart-type')
                renderExerciseChart()
            } else {
                chartBtns[i].classList.remove('activeChartBtn')
                chartBtns[i].classList.add('inactiveChartBtn')
            }
        }
    })
})