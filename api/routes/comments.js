const express   = require("express");
const router    = express.Router();
const mongoose  = require("mongoose");
const checkAuth = require("../middleware/check-auth");

const Comment = require("../models/comment");
const Phone = require("../models/phones");

router.post("/", checkAuth, (req, res, next)=> {
    Phone.findById(req.body.phone).then((phone) => {
        const comment = new Comment({
            _id: new mongoose.Types.ObjectId(),
           phone: phone._id,
           title: req.body.title,
           userName: req.body.userName,
           content: req.body.content
       });
       
       comment.save()
       .then(result => {
            phone.comments.push(result);
            phone.save().then(() => {
                res.status(200).json({
                    message: "Dodano nowy komentarz",
                    createdcomment: comment
                });
            });
       })
       .catch(err => res.status(500).json({error: err}));
    })
    
    
});

module.exports = router;