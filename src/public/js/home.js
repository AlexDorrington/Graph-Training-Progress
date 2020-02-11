const flipCardInner = document.getElementById('flip-card-inner')
const fliCardFront = document.getElementById('flip-card-front')
let flipLinks = document.querySelectorAll('.flipLink')

//FLIP BETWEEN LOGIN AND REGISTER
flipLinks = Array.from(flipLinks)
for (let link of flipLinks) {
    link.addEventListener('click', () => {
        flipCardInner.classList.toggle('flipRegister')
        fliCardFront.classList.toggle('displayRegister')
    })
}