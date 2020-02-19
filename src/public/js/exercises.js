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

monthBtnsDiv.addEventListener('click', (e) => {
    renderDays(e.target.name)
})

const renderDays = (btnName) => {
    const btnMonth = btnName
    const monthFromCalendarArry = calendar.find((month) => month[0].toLowerCase() == btnMonth)
    let i = 0;
    do {
        console.log(i)
        i++
    } while (i <= monthFromCalendarArry[1])
}