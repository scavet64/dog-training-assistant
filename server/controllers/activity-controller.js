import express from 'express';
import ActivityModel from '../models/activity.js'

const router = express.Router();

router.post('/', async (req, res) => {
    console.log('Attempting to store new activity');
    const activityType = req.body.type;
    const activityDate = req.body.date;

    if (!activityType || activityType.trim().length === 0) {
        console.log('Invalid Activity Type provided');
        return res.status(422).json({
            message: 'Invalid Activity Type provided.'
        });
    }

    const activity = new ActivityModel({
        activityType,
        activityDate
    });

    try {
        let savedActivity = await activity.save();
        res
            .status(201)
            .json({
                message: 'Activity Saved',
                activity: savedActivity
            });
        console.log('Saved new activity');
    } catch (err) {
        console.error('Error saving new activity');
        console.error(err.message);
        res.status(500).json({
            message: 'Error saving new activity'
        });
    }
});

router.put('/', async (req, res) => {
    console.log('Attempting to edit new activity');
    const activityId = req.body.activity._id;

    if (!activityId || activityId.trim().length === 0) {
        console.log('Invalid Activity Id provided');
        return res.status(422).json({
            message: 'Invalid Activity Id provided.'
        });
    }

    const activity = await ActivityModel.findById(activityId);
    if (!activity) {
        console.log('Activity was not found to modify');
        return res.status(404).json({
            message: 'Activity was not found to modify.'
        });
    }

    try {
        activity.activityType = req.body.activity.activityType;
        activity.activityDate = req.body.activity.activityDate;

        let savedActivity = await activity.save();
        res
            .status(201)
            .json({
                message: 'Activity Modified',
                activity: savedActivity
            });
        console.log('Modified activity');
    } catch (err) {
        console.error('Error Modifying activity');
        console.error(err.message);
        res.status(500).json({
            message: 'Error Modifying activity'
        });
    }
});

router.get('/', async (req, res) => {
    console.log('Trying to get list of activities');
    try {
        const activities = await ActivityModel.find().sort([['activityDate', -1], ['createdAt', -1]]);
        res.status(200).json(activities);
        console.log('Fetched Activities');
    } catch (err) {
        console.error('Error fetching Activities');
        console.error(err.message);
        res.status(500).json({
            message: 'Failed to load activities.'
        });
    }
});

router.delete('/:id', async (req, res) => {
    console.log('Attempting to delete activity');
    try {
      await ActivityModel.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Deleted Activity!' });
      console.log('Deleted Activity');
    } catch (err) {
      console.error('Error deleting requested activity');
      console.error(err.message);
      res.status(500).json({ message: 'Failed to delete activity.' });
    }
});

router.delete('/', async (req, res) => {
    console.log('Attempting to delete all activities');
    try {
      await ActivityModel.deleteMany();
      res.status(200).json({ message: 'Deleted All Activities!' });
      console.log('Deleted All Activities');
    } catch (err) {
      console.error('Error deleting all activities');
      console.error(err.message);
      res.status(500).json({ message: 'Failed to delete all activities.' });
    }
});

export default router;