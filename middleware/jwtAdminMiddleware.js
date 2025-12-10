const jwt = require("jsonwebtoken")

const jwtAdminMiddleware = (req,res,next)=>{
    //logic
    console.log("inside admin jwt middleware");

    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try{
        const jwtResponse = jwt.verify(token, "secretKey")
        console.log(jwtResponse);
        req.payload = jwtResponse.userMail
        if(req.payload == 'bookStoreAdmin@gmail.com'){
            next()
        }else{
                    res.status(401).json("invalid User, Not Admin")

        }
        
        
    }catch(err){
        console.log(err);
        
        res.status(500).json("invalid token")
    }
    
    
    
}

module.exports = jwtAdminMiddleware