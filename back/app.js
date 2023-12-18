const express = require("express")
const userRouter = require("./routes/userRoute")
const mongoose = require("mongoose")
const userController = require("./controllers/userController")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const userModule = require("./modules/userModule")

const tokenBlacklist = [];


const app = express()
app.use(express.json());

app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/MangaBlend')

app.use(express.static("./public"))
app.use(express.urlencoded({ extended: true }))




app.use("/user", userRouter)

app.get("/signup", (req, res) => res.render("signup"))


app.get("/logout", (req, res) => {
    const Authorization = req.header('Authorization')
    if (!Authorization) {
        return res.json({ access: false });
    }

    const token = req.header('Authorization').split(" ")[1]
    tokenBlacklist.push(token)
    return res.json({ access: true });
})



app.get("/isuserauth", (req, res) => {
    const Authorization = req.header('Authorization')
    if (!Authorization) {
        return res.send({ access: false });
    }
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (token && tokenBlacklist.includes(token)) {
        return res.json({ access: false });
    }
    jwt.verify(token, 'mySecretKey', async (err, user) => {
        if (err) {
            return res.json({ access: false });
        } else {
            const userid = user.id
            const user_info = await userModule.findOne({ _id: userid });
            const user_infoSend = { username: user_info.username, email: user_info.email }
            console.log("useer")
            console.log(user_infoSend)
            return res.json({ access: true, data: user_infoSend });
        }


    })
})

app.post("/signup", userController.addUser, (req, res) => res.redirect("/login"))
app.post("/login", userController.authUser, (req, res) => {
    console.log("user info")
    console.log(req.user)
    const token = jwt.sign({ id: req.user._id }, "mySecretKey", { expiresIn: "30s" })
    console.log("token")
    console.log(token)
    res.json({
        message: 'worked', data: { username: req.user.username, gmail: req.user.email, accesToken: token }
    })

})

app.get("/login", (req, res) => res.render("login"))

app.listen(3000, () => console.log("server running on port 3000"))