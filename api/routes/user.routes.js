const router = require('express').Router();
const User = require('./../models/User');
const CryptoJS = require('crypto-js');
const verify = require('../middlewares/verifyToken');
const { json } = require('express');

// UPDATE A USER
router.put("/:id", verify , async (req,res) => {

   if(req.user.id === req.params.id || req.user.isAdmin)  {
      try {
         //si el usuario quiere cambiar la password la encripto
         if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(
               req.body.password,
               process.env.SECRET_KEY
               ).toString()
         }
         const updatedUser = await User.findByIdAndUpdate(req.params.id,{ $set : req.body },{ new:true });
         res.status(200).json({user: updatedUser})
         
      } catch (error) {
         res.status(500).json({error:error})  
      }
   }else{
      res.status(403).json({error:"You can update only your account"})
   }

}) 
// DELETE A USER
router.delete("/:id", verify , async (req,res) => {

   if(req.user.id === req.params.id || req.user.isAdmin)  {
      try {
         const deletedUser = await User.findByIdAndDelete(req.params.id);
         res.status(200).json({ message:"User has been deleted", user: deletedUser})
         
      } catch (error) {
         res.status(500).json({error:error})  
      }
   }else{
      res.status(403).json({error:"You can delete only your account"})
   }

}) 

// GET ONE USER (Totally Public)
router.get("/find/:id", async (req,res) => {
      try {
         const foundUser = await User.findById(req.params.id);
         if(foundUser){
            res.status(200).json({user: foundUser})
         }else{
            res.status(404).json({message:"User not found with that id"})  
         }

      } catch (error) {
         res.status(500).json({error:error})  
      }

}) 

// GET ALL(solo puede el Admin,además puede traer todos o los 5 últimos,segun ponga ?new=true en los queryParam)
router.get("/", verify , async (req,res) => {
   const query = req.query.new;
   if(req.user.isAdmin) {
      try {
         const users = query
         ? await User.find({}).sort({_id:-1}).limit(5)
         : await User.find({})
         res.status(200).json({users: users});

      } catch (error) {
         res.status(500).json({error})
      }
   }else{
      res.status(403).json({error:"You are not allowed to perform this action"})
   }
})

// GET USERS STATS
router.get('/stats', async (req,res) => {
   const today = new Date();
   const lastYear = today.setFullYear(today.setFullYear()-1)
   
   const monthsArray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ]
// puedo usar $year y el _id me devolverá 2021,con $month será entre 1 y 12.Siempre un Number.Fijate en $group
   try {
      const data = await User.aggregate([
      {
         $project: 
         {
         month: { $month: "$createdAt" },
         },
      },{
         $group: { _id: "$month" , total : { $sum: 1 } }
      }]);
     
     res.status(200).json({data});
   
} catch (error) {
   res.status(500).json({error})
   }
})


module.exports = router;