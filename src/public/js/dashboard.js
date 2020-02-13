const dataBlocksContainer = document.getElementById('dataContainer')


//FETCH WEIGHT DATA
const fetchWeightData = async () => {
    const data = await fetch('http://localhost:3000/dashboard/weight', {
        method: 'GET'
    })
    const jsonData = await data.json()
    renderWeightData(jsonData)
}
fetchWeightData()


//RENDER EXISTING WEIGHT DATA ON LOAD
const renderWeightData = (weightDataArr) => {
    for (let weight of weightDataArr) {
        const contentBody = document.createElement('span')
        contentBody.innerHTML = `
        <div class="card text-center" style="width: 15vw; height: 10vh; margin: 2px; padding: 2px; flex-direction: column;">
            <div>
              <h5 class="card-title">${weight.date}</h5>
              <a href="#" class="card-link">Weight: ${weight.weight} ${weight.measure}</a>
              <a href="#" class="card-link">Bodyfat: ${weight.bodyfat}%</a>
            </div>
        </div>`
        dataBlocksContainer.appendChild(contentBody)
    }
}


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
    const weight = weightInput.value
    const bodyfat = bodyfatInput.value
    const date = dateInput.value
    await fetch('http://localhost:3000/dashboard/weight', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            weight,
            measure: btn,
            bodyfat,
            date
        })
    })
    renderNewWeight(weight, bodyfat, date, btn)
})

//RENDER NEWLY ADDED WEIGHT TO HTML
const renderNewWeight = (weight, bodyfat, date, lbs) => {
    const contentBody = document.createElement('span')
    contentBody.innerHTML = `
    <div class="card text-center" style="width: 15vw; height: 10vh; margin: 2px; padding: 2px; flex-direction: column;">
        <div>
            <h5 class="card-title">${date}</h5>
            <a href="#" class="card-link">Weight: ${weight} ${lbs}</a>
            <a href="#" class="card-link">Bodyfat: ${bodyfat}%</a>
        </div>
    </div>`
    dataBlocksContainer.appendChild(contentBody)
}