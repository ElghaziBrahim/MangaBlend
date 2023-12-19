const express = require("express")
const mongoose = require("mongoose")
const userController = require("./controllers/userController")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/MangaBlend')

app.use(express.static("./public"))

app.get("/logout", userController.logOutUser)
app.get("/isuserauth", userController.IsUserLogged)
app.post("/signup", userController.addUser)
app.post("/login", userController.authUser)

app.listen(3000, () => console.log("Server running on port 3000"))
