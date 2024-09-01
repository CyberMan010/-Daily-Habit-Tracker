import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { updateHabit } from '../utils/api';

const EditHabitModal = ({ isOpen, onClose, habit, onHabitUpdated }) => {
  const [habitData, setHabitData] = useState({
    name: '',
    description: '',
    categories: [],
  });

  useEffect(() => {
    if (habit) {
      setHabitData({
        name: habit.name,
        description: habit.description,
        categories: habit.categories,
      });
    }
  }, [habit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateHabit(habit._id, habitData);
      onHabitUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white rounded max-w-md mx-auto p-6">
          <Dialog.Title className="text-lg font-medium mb-4">Edit Habit</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={habitData.name}
                onChange={(e) => setHabitData({ ...habitData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                value={habitData.description}
                onChange={(e) => setHabitData({ ...habitData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="categories" className="block text-sm font-medium text-gray-700">Categories (comma-separated)</label>
              <input
                type="text"
                id="categories"
                value={habitData.categories.join(', ')}
                onChange={(e) => setHabitData({ ...habitData, categories: e.target.value.split(',').map(cat => cat.trim()) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update Habit
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default EditHabitModal;