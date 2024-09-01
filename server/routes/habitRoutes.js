const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// Get all habits with filtering and search
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      query.categories = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const habits = await Habit.find(query);
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new habit
router.post('/', async (req, res) => {
  const habit = new Habit({
    name: req.body.name,
    description: req.body.description,
    categories: req.body.categories,
  });

  try {
    const newHabit = await habit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a habit
router.put('/:id', async (req, res) => {
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        categories: req.body.categories,
        updatedAt: Date.now()
      },
      { new: true }
    );
    res.json(updatedHabit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a habit
router.delete('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Complete a habit for a specific date
router.post('/:id/complete', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    const date = new Date(req.body.date);
    
    const existingStatus = habit.completionStatus.find(
      status => status.date.toDateString() === date.toDateString()
    );

    if (existingStatus) {
      existingStatus.completed = true;
    } else {
      habit.completionStatus.push({ date, completed: true });
    }

    habit.updatedAt = Date.now();
    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;