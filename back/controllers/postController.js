const postModule = require("../modules/postModule")
const jwt = require("jsonwebtoken")

const getAllPosts = async (req, res) => {
    const posts = await postModule.find()
    res.json(posts)
}
function createPost(req, res) {
    const token = req.body.token
    const post = req.body.post
    jwt.verify(token, 'mySecretKey', async (err, user) => {
        if (err) {
            return res.json({ access: false });
        } else {
            const new_post = new postModule({
                title: post.title,
                content: post.content,
                user_id: user.id,
                username: user.username
            })
            new_post.save()
            res.json({ message: "added done" })
        }
    })

}

module.exports = { getAllPosts, createPost }