import { Router } from 'express';
import auth from '../../middleware/auth';
// Exercise Model
import Exercise from '../../models/Exercise';

const router = Router();


/**
 * @route   GET api/exercises
 * @desc    Get All exercises
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    if (!exercises) throw Error('No exercises');

    res.status(200).json(exercises);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercises) throw Error('Exercise not found');

    res.status(200).json(exercises);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/exercises
 * @desc    Create An Exercise
 * @access  Private
 */

router.post('/', auth, async (req, res) => {
  const { exerciseName, sets, reps, days, phone } = req.body;
  const newExercise = new Exercise({
    exerciseName,
    sets,
    reps,
    days,
    phone
  });

  try {
    const exercise = await newExercise.save();
    if (!exercise) throw Error('Something went wrong saving the exercise');

    res.status(200).json(exercise);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.exerciseName = req.body.exerciseName;
      exercise.sets = req.body.sets;
      exercise.reps = req.body.reps;
      exercise.days = req.body.days;

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @route   DELETE api/exercises/:id
 * @desc    Delete A exercise
 * @access  Private
 */

router.delete('/:id', auth, async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) throw Error('No exercise found');

    const removed = await Exercise.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the exercise');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

const mapStateToProps = state => ({
  auth: state.auth
}); 

export default router;
