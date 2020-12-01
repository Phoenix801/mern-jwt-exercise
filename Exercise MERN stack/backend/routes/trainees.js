const router = require('express').Router();
let Trainee = require('../models/trainee.model');

router.route('/').get((req, res) => {
  Trainee.find()
    .then(trainees => res.json(trainees))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newTrainee = new Trainee({username});

  newTrainee.save()
    .then(() => res.json('Trainee added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;