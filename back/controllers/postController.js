const postModule = require("../modules/postModule")
const jwt = require("jsonwebtoken")
const commentModule = require("../modules/commentModule")

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
async function getPostById(req, res) {
    const id = req.params.id;

    const post = await postModule.findOne({ _id: id }).exec();
    const comments = await commentModule.find({ post_id: id }).exec();

    res.send({ post: post, comments: comments })
}

async function getPostByCo(req, res) {
    const comSlug = req.params.co;
    console.log({ comSlug })
    const posts = await postModule.find({ communitySlug: comSlug }).exec();
    console.log(posts)

    res.send(posts)
}

module.exports = { getAllPosts, createPost, getPostById, getPostByCo }