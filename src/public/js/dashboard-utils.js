const filterBox = document.querySelector('.filterBox')
const slideFilterBox = document.getElementById('moveFilterBox')
const dataAddedTip = document.getElementById('contentAddTip')
const dataMatchTip = document.getElementById('contentMatchTip')
const closeModalBtn = document.getElementById('closeModal')



//Slide FILTER BOX
slideFilterBox.addEventListener('click', () => {
    filterBox.classList.toggle('animateFilterBox')
})


//CLOSE MODAL
closeModalBtn.addEventListener('click', () => {
    dataAddedTip.style.display = 'none'
    dataMatchTip.style.display = 'none'
})