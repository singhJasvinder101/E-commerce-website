const bcrypt = require("bcryptjs")
const salt = bcrypt.genSaltSync(10)


const hashPassword = password =>{
    return bcrypt.hashSync(password, salt)
}

const comparePasswords = (inputPassword, hashedPassword)=>{
    return bcrypt.compareSync(inputPassword, hashedPassword)
}
// console.log(hashPassword("hello"))
module.exports = { hashPassword, comparePasswords }
