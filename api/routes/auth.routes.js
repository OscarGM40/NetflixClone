const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// Register a User
router.post('/register', async (req,res) => {
   try {
      const newUser = await new User({
         username: req.body.username,
         email: req.body.email,
         password: CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString(),
      });
   
      const user = await newUser.save();
      res.json({user})
      
   } catch (error) {
      res.status(400).json({error})
   }   
})

// login 
router.post('/login', async (req, res) => {
   //
   try {
      const user = await User.findOne({email:req.body.email});
      if(!user){
         return res.status(401).json({message: 'Email not found'})
      }
      // si el email si es correcto comparo las password
      const originalPassword = CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
      if(originalPassword !== req.body.password){
         return res.status(401).json({message: 'Password incorrect'})
      }      
      const accessToken = jwt.sign({
         id:user._id,
         isAdmin:user.isAdmin,
      },process.env.SECRET_KEY,{
         expiresIn:"5d"
      });

      //recuerda que en user._doc tengo la data,puedo ocultar un campo con REST operator
      // TODO debo ocultar isAdmin a ser posible
      const { password,  ...info} = user._doc;


      res.json({ user:info,token:accessToken })       

   } catch (error) {
      res.status(400).json({error})
   }
})


module.exports = router;