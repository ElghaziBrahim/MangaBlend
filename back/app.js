const express = require("express")
const userRouter = require("./routes/userRoute")
const mongoose = require("mongoose")
const userController = require("./controllers/userController")

const app = express()
mongoose.connect('mongodb://127.0.0.1:27017/MangaBlend')

app.use(express.static("./public"))
app.use(express.urlencoded({ extended: true }))


app.set("views", "./views")
app.set("view engine", "pug")

app.use("/user", userRouter)

app.get("/signup", (req, res) => res.render("signup"))

app.post("/signup", userController.addUser, (req, res) => res.redirect("/login"))
app.post("/login", userController.authUser, (req, res) => res.redirect("/"))

app.get("/login", (req, res) => res.render("login"))
app.get("/", (req, res) => res.render("home"))

app.listen(3000, () => console.log("server running"))