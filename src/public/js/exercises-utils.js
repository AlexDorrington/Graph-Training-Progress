//ENABLE INPUT INTO TABLE CELLS ON EDIT BUTTON CLICK
const editBtn = document.getElementById('editBtn')
const deleteBtn = document.getElementById('deleteBtn')
const saveBtn = document.getElementById('saveBtn')

const toggleInputState = () => {
    changeBtnVisual()
    const allInputFields = Array.from(document.querySelectorAll('.statInput'))
    for (let input of allInputFields) {
        input.disabled = !input.disabled
    }
}

editBtn.addEventListener('click', toggleInputState)


//VISUAL OF ACTIVE EDIT BUTTON
const actionBtns = [deleteBtn, saveBtn]

const changeBtnVisual = () => {
    for (let btn of actionBtns) {
        btn.disabled = !btn.disabled
        btn.classList.toggle('inactiveBtn')
    }
}