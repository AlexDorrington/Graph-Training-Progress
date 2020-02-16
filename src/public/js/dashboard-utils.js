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


//SUBMIT FILTER
const filterSubmitBtn = document.getElementById('submitFilter')

filterSubmitBtn.addEventListener('click', () => {
    let filterBy;
    radioBtnArray.forEach((btn) => {
        if (btn.checked) {
            filterBy = btn.value
        }
    })
    const test = weightData.filter((item) => {
        return item[filterBy] == 171
    })
    console.log(test)
})


//CLOSE MODAL
closeModalBtn.addEventListener('click', () => {
    dataAddedTip.style.display = 'none'
    dataMatchTip.style.display = 'none'
})