const userModule = require("../modules/userModule")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const tokenBlacklist = [];




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
        return res.send('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.send({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user._id }, "mySecretKey", { expiresIn: "30s" })
    res.json({
        message: 'worked', data: { username: user.username, gmail: user.email, accesToken: token }
    })
}
function IsUserLogged(req, res) {
    const Authorization = req.header('Authorization')
    if (!Authorization) {
        return res.send({ access: false });
    }
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    jwt.verify(token, 'mySecretKey', async (err, user) => {
        if (err) {
            return res.json({ access: false });
        } else {
            if (token && tokenBlacklist.includes(token)) {
                return res.json({ access: false });
            }
            const userid = user.id
            const user_info = await userModule.findOne({ _id: userid });
            const user_infoSend = { username: user_info.username, email: user_info.email }
            return res.json({ access: true, data: user_infoSend });
        }


    })
}
function logOutUser(req, res) {
    const Authorization = req.header('Authorization')
    if (!Authorization) {
        return res.json({ access: false });
    }
    const token = req.header('Authorization').split(" ")[1]
    tokenBlacklist.push(token)
    return res.json({ access: true });
}

module.exports = { addUser, authUser, IsUserLogged,logOutUser }