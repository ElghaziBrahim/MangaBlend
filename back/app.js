const express = require("express")
const userRouter = require("./routes/userRoute")
const mongoose = require("mongoose")
const userController = require("./controllers/userController")
const session = require("express-session")
const cors = require("cors")


const app = express()
app.use(express.json());

app.use(cors())
app.use(session({
    secret: "Un secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use((req, res, next) => {
    console.log("session")
    console.log(req.session.user)
    req.data = {
        user: {}
    }
    if (req.session.user) {
        req.data.user = req.session.user
    }
    next()
})
mongoose.connect('mongodb://127.0.0.1:27017/MangaBlend')

app.use(express.static("./public"))
app.use(express.urlencoded({ extended: true }))


app.set("views", "./views")
app.set("view engine", "pug")

app.use("/user", userRouter)

app.get("/signup", (req, res) => res.render("signup"))


app.get("/logout", (req, res) => {
    req.session.user = {}
    res.redirect("/")
})

app.get("/isuserauth", (req, res) => {
    console.log("worked")

    console.log(req.session.user)
    if (req.data.user) {

        res.json({ message: "logged", data: req.data.user })
    } else {
        res.json({ message: "not logged" })
    }
})

app.post("/signup", userController.addUser, (req, res) => res.redirect("/login"))
app.post("/login", userController.authUser, (req, res) => {
    req.session.user = req.user
    console.log("loggggggin")
    console.log(req.session.user)
    res.json({ message: 'worked', data: req.session.user })
})

app.get("/login", (req, res) => res.render("login"))
app.get("/", (req, res) => res.render("home", req.data))

app.listen(3000, () => console.log("server running on port 3000"))