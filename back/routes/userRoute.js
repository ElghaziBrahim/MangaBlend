const router = require("express").Router()

router.get("/",(req,res)=>{
    res.send("users")
})


module.exports=router