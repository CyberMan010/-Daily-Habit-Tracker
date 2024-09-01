// src/components/AddHabitForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



function AddHabitModal() {
  const [habit, setHabit] = useState({
    name: '',
    description: '',
    category: '',
    tags: [],
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'tags') {
      setHabit({ ...habit, tags: e.target.value.split(',') });
    } else {
      setHabit({ ...habit, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/habits', habit);
      navigate('/');
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Habit</h2>
      <div className="mb-4">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={habit.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Description:</label>
        <textarea
          name="description"
          value={habit.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Category:</label>
        <select
          name="category"
          value={habit.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a category</option>
          <option value="health">Health</option>
          <option value="productivity">Productivity</option>
          <option value="mindfulness">Mindfulness</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Tags (comma-separated):</label>
        <input
          type="text"
          name="tags"
          value={habit.tags.join(',')}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Habit
      </button>
    </form>
  );
}

export default AddHabitModal;
          