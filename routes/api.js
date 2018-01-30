//create all api route

const express = require('express');

const router = express.Router();
const Ninja = require("../models/ninja");

//get a list of ninjas from db
router.get('/ninjas', function(req, res, next) {
  Ninja.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        distanceField: "dist.calculated",
        maxDistance: 100000,
        spherical: true
      }
    }
  ]).then(function (ninjas) {
    res.send(ninjas);
  }).catch(next);
});

//add a new ninja to the db
router.post('/ninjas', function (req, res, next) {
  Ninja.create(req.body).then(function (ninja) {
    res.send(ninja);
  }).catch(next);
  // var ninja = new Ninja(req.body);
  // ninja.save();
  //remove this to create ne instance of model =>console.log(req.body);
  // res.send({type:'POST',
  //name: req.body.name,
  //rank: req.body.rank
  //});
});


//update a ninja in the db
router.put('/ninjas/:id', function (req, res, next) {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (ninja) {
    Ninja.findOne({ _id: req.params.id }).then(function (ninja) {
      res.send('ninja');
    });
  });
});
//Delete a ninja from the db
router.delete('/ninjas/:id', function (req, res, next) {
  //console.log(req.params.id);
  Ninja.findByIdAndRemove({ _id: req.params.id }).then(function (ninja) {
    res.send(ninja);
  });
  //res.send({ type: 'DELETE' });
});

module.exports = router;
