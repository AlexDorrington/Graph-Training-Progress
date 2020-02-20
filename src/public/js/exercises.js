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

monthBtnsDiv.addEventListener('click', ({target}) => {
    const btnMonthName = target
    daysContainer.innerHTML = ''
    if (btnMonthName.classList.contains('activeMonth')) {
        return btnMonthName.classList.remove('activeMonth')
    }
    renderBtnsStatus(btnMonthName)
    returnNoOfDays(btnMonthName.name, (day) => {
        const newDayBtn = document.createElement('button')
        newDayBtn.classList.add('dayBtn')
        newDayBtn.innerHTML = day
        daysContainer.appendChild(newDayBtn)
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
    const monthFromCalendarArry = calendar.find((month) => month[0].toLowerCase() == btnMonth)
    let i = 1;
    do {
        cb(i)
        i++
    } while (i <= monthFromCalendarArry[1])
}

