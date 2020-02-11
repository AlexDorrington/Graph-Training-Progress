const path = require('path')

const {UserModel} = require(path.join(__dirname, '../../', 'model', 'User.js'))


const checkValid = async (formBody) => {
    let valid = true
    const {firstname, surname, email, password} = formBody
    if (!firstname || !surname || !email || !password) {
        valid = false
    }
    const userExists = await UserModel.findOne({
        email
    })
    if (userExists) {
        valid = false
    }
    return valid
}


module.exports = {
    isValidReg: checkValid
}