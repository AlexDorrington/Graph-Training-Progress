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


//RENDER DAYS PER MONTH DIV
const monthBtnsDiv = document.getElementById('monthBtns')
const daysContainer = document.getElementById('daysContainer')

monthBtnsDiv.addEventListener('click', (e) => {
    daysContainer.innerHTML = ''
    renderBtnsInactive()
    e.target.classList.add('activeMonth')
    const btnMonthName = e.target.name
    returnNoOfDays(btnMonthName, (day) => {
        const newButton = document.createElement('button')
        newButton.classList.add('dayBtn')
        newButton.innerHTML = day
        daysContainer.appendChild(newButton)
    })
})

const renderBtnsInactive = () => {
    const btns = Array.from(document.querySelectorAll('.month'))
    btns.forEach(btn => {
        btn.classList.remove('activeMonth')
    })
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

