const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const app= express()
const Meme = require("../models/memes");

var dataLength;











router.get('/', async (req, res)=>{
  var result = [];
  try{
      // Retrieving Latest 100 Memes Data From DataBase
      const posts = await Meme.find().sort({$natural:-1}).limit(100);
      posts.forEach(indexing =>{
          var newObj={};
          newObj._id= indexing._id;
          newObj.name = indexing.name;
          newObj.url = indexing.url;
          newObj.caption = indexing.caption;
          result.push(newObj);
      });
  }
  catch(err){
      console.log(err);
  }
   
  res.json(result);
});


router.post("/",async (req, res, next) => {
  var newObj = req.body;
  const meme = new Meme({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    caption: req.body.caption,
    url:req.body.url,
    
  });

  var flag=0;


  try{
    const posts = await Meme.find();
    posts.forEach(da =>{
        if(da.name == newObj.name && da.url == newObj.url && da.caption == newObj.caption)
        {
            flag = 1;
        }
    });
}
catch(err){
    console.log(err);
}

if(flag==1)
    {
        // if Same Data is present
        res.sendStatus(409);
    }
else{
    // Getting dataLength For ID of the meme
    // try{
    //     const posts = await Meme.countDocuments();
    //     dataLength = `${posts+1}`;
    // }
    // catch(err){
    //     console.log(err);
    // }
    
    //var obj = {id: dataLength};
    //newObj.id = dataLength;
    newObj._id=meme._id;
    const postData = new Meme(newObj);
    try{
        const savedData = await postData.save();
        res.json({id:newObj._id});
    }
    catch(err){
        console.log(err);
        res.json({mess:err})
    }
}
}
 
);

router.get("/:memeID", (req, res, next) => {
  const id = req.params.memeID;
  Meme.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// router.patch("/:memeID", (req, res, next) => {
//   const id = req.params.memeID;
//   console.log('WE HERE')
//   var updateOps = 'SDF'
//   // for (const ops of req.body) {
//   //   updateOps[ops.propName] = ops.value;
//   // }
//   Meme.update({ _id: id }, { $set: updateOps })
//     .exec()
//     .then(result => {
//       console.log(result);
//       res.status(200).json(result);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });



router.patch('/:id',async(req,res,next) => {
  //var updatedObject = req.body; 
  var _id = req.params.id;
  Meme.findByIdAndUpdate(_id, { caption: req.body.caption}, 
                            function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Updated Meme : ", docs); 
        res.status(200).json(docs);
    } 
}); 

});

router.delete("/:Id", (req, res, next) => {
  const id = req.params.Id;
  Meme.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
