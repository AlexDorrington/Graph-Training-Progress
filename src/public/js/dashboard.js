//FETCH WEIGHT DATA
const fetchWeightData = async () => {
    const data = await fetch('http://localhost:3000/dashboard/weight', {
        method: 'GET'
    })
    const jsonData = await data.json()
    console.log(jsonData)
}
fetchWeightData()

//DISPLAY WEIGHT DATA



//POST NEW WEIGHT DATA
const weightForm = document.getElementById('weightForm')
const weightInput = document.getElementById('weightInput')
const bodyfatInput = document.getElementById('bodyfatInput')
const dateInput = document.getElementById('dateInput')
const kgRadioBtn = document.getElementById('kgInput')
const lbsRadioBtn = document.getElementById('lbsInput')

kgRadioBtn.addEventListener('change', (e) => {
    if (e.target.checked) {
        lbsRadioBtn.checked = false
    }
})
lbsRadioBtn.addEventListener('change', (e) => {
    if (e.target.checked) {
        kgRadioBtn.checked = false
    }
})

weightForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let btn;
    kgRadioBtn.checked ? btn = 'kg' : btn = 'lbs'
    await fetch('http://localhost:3000/dashboard/weight', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            weight: weightInput.value,
            measure: btn,
            bodyfat: bodyfatInput.value,
            date: dateInput.value
        })
    })
    fetchWeightData()
})