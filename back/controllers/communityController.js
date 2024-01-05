const communityModule = require("../modules/communityModule")

async function getCommunityBySlug(req, res) {
    const slug_community = req.params.slug
    try {
        const community = await communityModule.findOne({ slug: slug_community })
        res.send(community)
    } catch (error) {
        console.error("Error fetching community:", error);
    }


}

module.exports = { getCommunityBySlug }