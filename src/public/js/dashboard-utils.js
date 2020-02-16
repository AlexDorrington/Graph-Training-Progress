const filterBox = document.querySelector('.filterBox')
const slideFilterBox = document.getElementById('moveFilterBox')
const dataAddedTip = document.getElementById('contentAddTip')
const dataMatchTip = document.getElementById('contentMatchTip')
const closeModalBtn = document.getElementById('closeModal')



//Slide FILTER BOX
slideFilterBox.addEventListener('click', () => {
    filterBox.classList.toggle('animateFilterBox')
})


//CHECK AND UNCHECKED RADIO BUTTONS
const dateRadioBtn = document.getElementById('filterDateRadio')
const weightRadioBtn = document.getElementById('filterWeightRadio')
const bodyfatRadioBtn = document.getElementById('filterBodyfatRadio')

const radioBtnArray = [dateRadioBtn, weightRadioBtn, bodyfatRadioBtn]

radioBtnArray.forEach(btn => {
    btn.addEventListener('change', (e) => {
        radioBtnArray.forEach((btn) => [
            btn.checked = false
        ])
        e.target.checked = true
    })
})


//FILTER DATA BLOCKS
const filterSubmitBtn = document.getElementById('submitFilter')

filterSubmitBtn.addEventListener('click', async () => {
    const dataBlocks = Array.from(document.querySelectorAll('.card'))
    const filterPhrase = document.getElementById('filterInput').value
    let filterBy;
    radioBtnArray.forEach((btn) => {
        if (btn.checked) {
            filterBy = btn.value
        }
    })
    const filterResults = await weightData
    .map(item => item[filterBy] == filterPhrase ? item.dataID : false)
    .filter(item => item)
    dataBlocks.findIndex(block => {
        block.id
    })
    dataBlocks.filter((block) => !filterResults
    .includes(parseInt(block.id)))
    .forEach(block => block.style.display = 'none');
})


//RESET FILTER
const filterResetBtn = document.getElementById('resetFilter')

filterResetBtn.addEventListener('click', () => {
    weightData.length = 0
        editDiv.style.display = 'none'
        dataBlocksContainer.innerHTML = ''
        contentEditSpinner.style.display = 'block'
        setTimeout(() => {
            contentEditSpinner.style.display = 'none'
            fetchWeightData()
        }, 1750)
})


//CLOSE MODAL
closeModalBtn.addEventListener('click', () => {
    dataAddedTip.style.display = 'none'
    dataMatchTip.style.display = 'none'
})