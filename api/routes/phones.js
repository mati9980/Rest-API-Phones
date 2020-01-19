const express   = require("express");
const router    = express.Router();
const mongoose  = require("mongoose");
const checkAuth = require("../middleware/check-auth");

const Phone = require("../models/phones");

router.get("/", (req, res, next)=> {
    Phone.find().populate("comments").exec()
    .then(docs=> {
        res.status(200).json(docs);
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.post("/", checkAuth, (req, res, next)=> {
    const Phone = new Phone({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        model: req.body.model,
        cpu: req.body.cpu,
        ram: req.body.ram

    });
    Phone.save()
    .then(result => {
        res.status(200).json({
            message: "Dodano nowy telefon",
            createdphone: phone
        });
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.get("/get/:phoneId", (req, res, next)=> {
    const id = req.params.phoneId;
    Phone.findById(id).exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({error: err}));

    
});
router.get("/phoneSearch", (req, res, next)=> {
    const name = req.query.name;
    const model = req.query.model;
    const SearchParams = {};

    if (name) {

        SearchParams.name = new RegExp(name, 'i');
    }
        
    if (model) {
        SearchParams.model = new RegExp(model, 'i');

    }
    
    Phone.find(SearchParams).exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.patch("/:phoneId", (req, res, next)=> {
    const id = req.params.phoneId;
    Phone.update({_id:id}, { $set: {
        name: req.body.name,
        model: req.body.model,
        cpu: req.body.cpu,
        ram: req.body.ram
    }}).exec()
    .then(result=> {
        res.status(200).json({message: "Zmiana informacji o telefonie o numerze ID " + id});
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.delete("/:phoneId", (req, res, next)=> {
    const id = req.params.phoneId;
    Phone.remove({_id: id}).exec()
    .then(result=> {
        res.status(200).json({message: "Usunięcie telefonu o numerze ID " + id});
    })
    .catch(err => res.status(500).json({error: err}));
    
});

module.exports = router;