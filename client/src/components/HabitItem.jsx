import React from 'react';
import ProgressBar from './ProgressBar';
import { completeHabit, deleteHabit } from '../utils/api';

const HabitItem = ({ habit, onUpdate, onEdit }) => {
  const handleComplete = async () => {
    try {
      await completeHabit(habit._id, new Date().toISOString().split('T')[0]);
      onUpdate();
    } catch (error) {
      console.error('Error completing habit:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteHabit(habit._id);
      onUpdate();
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  const calculateProgress = () => {
    const totalDays = 30; // Assuming we're tracking the last 30 days
    const completedDays = habit.completionStatus.filter(
      status => status.completed && new Date(status.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length;
    return (completedDays / totalDays) * 100;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{habit.name}</h3>
          <p className="text-gray-600">{habit.description}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleComplete}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Complete
          </button>
          <button
            onClick={() => onEdit(habit)}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mb-4">
        {habit.categories.map((category) => (
          <span key={category} className="mr-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {category}
          </span>
        ))}
      </div>
      <ProgressBar progress={calculateProgress()} />
    </div>
  );
};

export default HabitItem;