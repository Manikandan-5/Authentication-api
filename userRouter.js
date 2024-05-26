const router = require("express").Router();
const User = require("./userSchema");
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")

router.post("/register", async (req, res) => {
    try {
        var emailExist=await User.findOne( {email: req.body.email})
        if(emailExist){
            return res.status(400).json("Email already Exist");
        }
        //Password hash
    var hash=await bcrypt.hash(req.body.password,10)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        });

        const savedUser = await user.save();
           
        res.json(savedUser);
    } catch (error) {
        console.error("Error registering user:", error.stack);
        res.status(500).json(error);
    }
});

router.post("/login",async (req,res)=>{
    try {
        var userdata=await User.findOne( {email: req.body.email})
        if(!userdata){
            return res.status(400).json("Email not Exist");
        }
        var validPsw =await bcrypt.compare(req.body.password,userdata.password);
        if(!validPsw){
            return res.status(400).json("Password not  Valid")
        }

        var userToken= jwt.sign({email:userdata.email},"Valid Secret Key");

        res.header('auth',userToken).json(userToken)

    } catch (error) {
        res.status(400).json(error)
    }
})

const validUser=(req,res,next)=>{
    var token=req.header('auth')
    req.token=token
    next();
}

router.get('/getall',validUser,async (req,res)=>{
    jwt.verify(req.token,"Valid Secret Key",async(err,data)=>{
        if(err){res.sendStatus(403)}
        else{
            const  data=await User.find().select(['-password']);
            res.json(data);}
    });
})





module.exports = router;
