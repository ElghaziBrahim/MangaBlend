const route = require("express").Router()
const communityController = require("../controllers/communityController")

route.get("/:slug", communityController.getCommunityBySlug)

module.exports = route