const dataBlocksContainer = document.getElementById('dataContainer')
const loadingSpinner = document.getElementById('contentAddedSpinner')
let weightData;
let user;



//FETCH WEIGHT DATA
const fetchWeightData = async () => {
    const data = await fetch('http://localhost:3000/dashboard/weight', {
        method: 'GET'
    })
    const jsonData = await data.json()
    weightData = await jsonData
    user = weightData[0].user
    renderWeightData(jsonData)
    renderChart()
    getEditBtns()
    getDeleteBtns()
}
fetchWeightData()


//RENDER EXISTING WEIGHT DATA ON LOAD
const renderWeightData = (weightDataArr) => {
    for (let weight of weightDataArr) {
        const contentBody = document.createElement('span')
        contentBody.innerHTML = `
        <div class="card text-center" id="${weight.dataID}" style="color: #ff6600;background-color: #343a40ab; max-width: 15.5vw; max-height: 14vh; margin: 2px; padding: 2px; flex-direction: column;">
            <div>
                <h5 class="card-title">${weight.date}</h5>
                <a style="color: #ff6600" href="#" class="card-link">Weight: ${weight.weight} ${weight.measure}</a>
                <a style="color: #ff6600" href="#" class="card-link">Bodyfat: ${weight.bodyfat}%</a>
                </br>
                    <button class="btn btn-primary editBtn" id="${weight.dataID}" style="margin: 2px 5px 0">Edit</button>
                    <button class="btn btn-danger deleteBtn" id="${weight.dataID}" style="margin: 2px 5px 0">Delete</button>
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
    renderChart()
})

//CHECK IF POST DATE ALREADY EXISTS
const checkDateExists = async (date) => {
    const foundMatch = await weightData.find(item => {
        return item.date == date
    })
    return (foundMatch)
}


//RENDER NEWLY ADDED WEIGHT TO HTML
const renderNewWeight = (weight, bodyfat, date, id, lbs) => {
    const contentBody = document.createElement('span')
    contentBody.innerHTML = `
    <div class="card text-center" id="${id}" style="color: #ff6600; background-color: #343a40ab; max-width: 15.5vw; max-height: 14vh; margin: 2px; padding: 2px; flex-direction: column;">
        <div>
            <h5 class="card-title">${date}</h5>
            <a style="color: #ff6600" href="#" class="card-link">Weight: ${weight} ${lbs}</a>
            <a style="color: #ff6600" href="#" class="card-link">Bodyfat: ${bodyfat}%</a>
            </br>
                <button class="btn btn-primary editBtn" id="${id}" style="margin: 2px 5px 0">Edit</button>
                <button class="btn btn-danger deleteBtn" id="${id}" style="margin: 2px 5px 0">Delete</button>
        </div>
    </div>`
    dataBlocksContainer.appendChild(contentBody)
    setTimeout(() => {
        loadingSpinner.style.display = 'none'
        dataAddedTip.style.display = 'block'
    }, 750)
    getEditBtns()
    getDeleteBtns()
}


//EDIT EXISTING WEIGHT DATA
const editDiv = document.getElementById('editDiv')
const editWeightForm = document.getElementById('editWeightForm')
const newWeightInput = document.getElementById('newWeightInput')
const newBodyfatInput = document.getElementById('newBodyfatInput')

const getEditBtns = () => {
    const editBtns = document.querySelectorAll('.editBtn')
    editBtnArray = Array.from(editBtns)
    editBtnArray.forEach(btn => {
        btn.addEventListener('click', editItem)
    })
}

const contentEditSpinner = document.getElementById('contentEditSpinner')

const editItem = async (e) => {
    const dataID = e.target.id
    editDiv.style.display = 'block'
    editWeightForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/dashboard/weight/${dataID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newWeight: newWeightInput.value,
                newBodyfat: newBodyfatInput.value
            })
        })
        weightData.length = 0
        editDiv.style.display = 'none'
        dataBlocksContainer.innerHTML = ''
        contentEditSpinner.style.display = 'block'
        setTimeout(() => {
            contentEditSpinner.style.display = 'none'
            fetchWeightData()
            renderChart()
        }, 1750)
    }, {
        once: true
    })
}


//DELETE EXISTING WEIGHT DATA
const getDeleteBtns = () => {
    const deleteBtns = document.querySelectorAll('.deleteBtn')
    deleteBtnArray = Array.from(deleteBtns)
    deleteBtnArray.forEach(btn => {
        btn.addEventListener('click', deleteItem)
    })
}

const deleteItem = async (e) => {
    const confirmDelete = confirm('Would you like to delete this item?')
    if (!confirmDelete) {
        return
    }
    fetch(`http://localhost:3000/dashboard/weight/${e.target.id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dataID: e.target.id
        })
    })
    e.target.offsetParent.style.display = 'none'
    weightData.length = 0
}