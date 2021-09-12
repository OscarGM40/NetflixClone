const router = require("express").Router();
const List = require("./../models/List");
const verify = require("../middlewares/verifyToken");


// CREATE A LIST ** Solo puede un Admin **
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(403).json({ error: "You are not allowed to create a movie" });
  }
});

// DELETE A LIST ** Solo puede un Admin **
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json({message:"the list has been deleted"});
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(403).json({ error: "You are not allowed to delete a movie" });
  }
});

// GET ALL LISTS ** anyone but authenticated returns size:10 **
// /api/list || /api/list?type=movie || /api/list?type=movie&genre=action
router.get('/', verify, async (req, res) => {
   const typeQuery = req.query.type;
   const genreQuery = req.query.genre;
   let list = [];

   try {
      // 
      if(typeQuery){
          if(genreQuery){ // me devuelve 10 del tipo que sea
             list = await List.aggregate([
                { $sample: { size:10 } },
                { $match: { type: typeQuery, genre: genreQuery }}
               ]);
          }else {
             list = await List.aggregate([
                { $sample: { size:10 } },
                { $match: { type: typeQuery } }
               ]) ;
          }
      } else {
         list = await List.aggregate([ { $sample:{ size:10 } } ])
      }
      res.status(200).json(list)
   } catch (error) {
      res.status(500).json({ error });
   }
})

module.exports = router;