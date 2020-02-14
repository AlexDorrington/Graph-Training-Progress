const dataBlocksContainer = document.getElementById('dataContainer')
const closeModalBtn = document.getElementById('closeModal')
const loadingSpinner = document.getElementById('contentAddedSpinner')
const dataAddedTip = document.getElementById('contentAddTip')
const dataMatchTip = document.getElementById('contentMatchTip')
let weightData;
let user;



closeModalBtn.addEventListener('click', () => {
    dataAddedTip.style.display = 'none'
    dataMatchTip.style.display = 'none'
})


//FETCH WEIGHT DATA
const fetchWeightData = async () => {
    const data = await fetch('http://localhost:3000/dashboard/weight', {
        method: 'GET'
    })
    const jsonData = await data.json()
    weightData = jsonData
    user = weightData[0].user
    renderWeightData(jsonData)
}
fetchWeightData()


//RENDER EXISTING WEIGHT DATA ON LOAD
const renderWeightData = (weightDataArr) => {
    for (let weight of weightDataArr) {
        const contentBody = document.createElement('span')
        contentBody.innerHTML = `
        <div class="card text-center" id="${weight.dataID}" style="color: #ff6600;background-color: #343a40ab; width: 15.5vw; height: 15vh; margin: 2px; padding: 2px; flex-direction: column;">
            <div>
                <h5 class="card-title">${weight.date}</h5>
                <a style="color: #ff6600" href="#" class="card-link">Weight: ${weight.weight} ${weight.measure}</a>
                <a style="color: #ff6600" href="#" class="card-link">Bodyfat: ${weight.bodyfat}%</a>
                </br>
                    <button class="btn btn-primary" style="margin: 0 5px">Edit</button><button class="btn btn-danger" style="margin: 0 5px">Delete</button>
            </>
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
    const dataID = Date.now()
    const dateMatch = await checkDateExists(date)
    if (dateMatch) {
        return dataMatchTip.style.display = 'block'
    }
    await fetch('http://localhost:3000/dashboard/weight', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            weight,
            measure: btn,
            bodyfat,
            date,
            dataID
        })
    })
    weightData.push({
        weight,
        measure: btn,
        bodyfat,
        date,
        id: dataID,
        user
    })
    renderNewWeight(weight, bodyfat, date, dataID, btn)
    loadingSpinner.style.display = 'block'
})

//CHECK IF POST DATE ALREADY EXISTS
const checkDateExists = async (date) => {
    const foundMatch = await weightData.find((item) => {
        return item.date == date
    })
    return (foundMatch)
}


//RENDER NEWLY ADDED WEIGHT TO HTML
const renderNewWeight = (weight, bodyfat, date, id, lbs) => {
    const contentBody = document.createElement('span')
    contentBody.innerHTML = `
    <div class="card text-center" id="${id}" style="color: #ff6600; background-color: #343a40ab; width: 15.5vw; height: 15vh; margin: 2px; padding: 2px; flex-direction: column;">
        <div>
            <h5 class="card-title">${date}</h5>
            <a style="color: #ff6600" href="#" class="card-link">Weight: ${weight} ${lbs}</a>
            <a style="color: #ff6600" href="#" class="card-link">Bodyfat: ${bodyfat}%</a>
            </br>
                <button class="btn btn-primary" style="margin: 0 5px">Edit</button><button class="btn btn-danger" style="margin: 0 5px">Delete</button>
        </div>
    </div>`
    dataBlocksContainer.appendChild(contentBody)
    setTimeout(() => {
        loadingSpinner.style.display = 'none'
        dataAddedTip.style.display = 'block'
    }, 750)
}


//EDIT EXISTING WEIGHT DATA


//DELETE EXISTING WEIGHT DATA