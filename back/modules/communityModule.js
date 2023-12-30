const mongoose = require("mongoose")

const community = mongoose.model("community", new mongoose.Schema({
    name: String,
    description: String,
    logo: String,
    slug: String
}))

module.exports = community