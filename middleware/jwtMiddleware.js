const jwt = require("jsonwebtoken")

const jwtMiddleware = (req,res,next)=>{
    //logic
    console.log("inside jwt middleware");

    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try{
        const jwtResponse = jwt.verify(token, "secretKey")
        console.log(jwtResponse);
        req.payload = jwtResponse.userMail
        next()
        
    }catch(err){
        console.log(err);
        
        res.status(401).json("invalid token")
    }
    
    
    
}

module.exports = jwtMiddleware