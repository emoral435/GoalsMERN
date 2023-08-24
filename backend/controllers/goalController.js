const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// NOTE get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json({ goals });
});

// NOTE Set goals
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field.");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json({ goal });
});

// NOTE Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found.");
  }

  // Check for the user existing and having an acc
  if (!req.user) {
    res.status(400);
    throw new Error("User not found.");
  }

  // Check if the user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("You are not the owner of this goal.");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ updatedGoal });
});

// NOTE Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found.");
  }

  // Check for the user existing and having an acc
  if (!req.user) {
    res.status(400);
    throw new Error("User not found.");
  }

  // Check if the user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("You are not the owner of this goal.");
  }

  await goal.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
