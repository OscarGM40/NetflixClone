const jwt = require('jsonwebtoken');


function verify(req, res, next) {

   const authHeader = req.headers.authorization;
   // console.log(req.headers)
   if(authHeader){
      const token = authHeader.split(' ')[1];

      jwt.verify(token,process.env.SECRET_KEY,((err,data) => {
         if(err) { return res.status(403).json({error:"Token is not valid"})}
         req.user= data;
         next();
      }));
      
   }else {
      return res.status(401).json({error:"You are not authenticated"})
   }

}

module.exports = verify;