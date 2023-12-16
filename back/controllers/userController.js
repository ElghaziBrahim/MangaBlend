const userModule = require("../modules/userModule")
const bcrypt = require('bcrypt');



async function addUser(req, res, next) {
    req.data = { user: "userfound" }
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new userModule({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
    })
    user.save()
    next()
}
async function authUser(req, res, next) {
    const email = req.body.email
    const password = req.body.password
    console.log(email)
    const user = await userModule.findOne({ email })
    if (!user) {
        return res.status(404).send('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send('Invalid password');
    }
    req.session.user = user
    next()
}

module.exports = { addUser, authUser }