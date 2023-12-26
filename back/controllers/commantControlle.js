const commentModule = require("../modules/commentModule")
const jwt = require("jsonwebtoken")

function addComment(req, res) {
    const token = req.body.token
    const comment = req.body.comment
    const postId = req.body.postId
    jwt.verify(token, 'mySecretKey', async (err, user) => {
        if (err) {
            return res.json({ access: false });
        } else {

            const newComment = new commentModule({
                post_id: postId,
                user_id: user.id,
                username: user.username,
                content: comment
            })
            newComment.save()

            res.json({ message: "added done" })
        }
    })
}

module.exports = { addComment }