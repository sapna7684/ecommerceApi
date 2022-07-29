const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// Register
router.put("/:id", verifyTokenAndAuthorization, async (req,res)=> {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_CRYPTO).toString()
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:req.body
        }, {new:true});
        res.status(200).json(updatedUser);
    } catch(err){
        res.status(500).json(err);
    }
});

// Delete

router.delete("/:id", verifyTokenAndAuthorization, async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...")
    } catch(err){
        res.status(500).json(err);
    }
});

// Get all User

router.get("/", verifyTokenAndAdmin, async (req,res) => {
    const query = req.query.new
    try{
        const user = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router