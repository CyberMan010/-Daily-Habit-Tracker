import React, { useState, useEffect } from 'react';
import HabitList from '../components/HabitList';
// import AddHabitModal from '../components/AddHabitModal';
// import {AddHabitModal} from '../components/AddHabitModal';
import AddHabitModal from '../components/AddHabitModal';
import EditHabitModal from '../components/EditHabitModal';
import FilterBar from '../components/FilterBar';
import { fetchHabits } from '../utils/api';

const MainPage = () => {
  const [habits, setHabits] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [filters, setFilters] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadHabits();
  }, [filters]);

  const loadHabits = async () => {
    try {
      const fetchedHabits = await fetchHabits(filters);
      setHabits(fetchedHabits);
      updateCategories(fetchedHabits);
    } catch (error) {
      console.error('Error loading habits:', error);
    }
  };

  const updateCategories = (habits) => {
    const allCategories = habits.flatMap(habit => habit.categories);
    const uniqueCategories = [...new Set(allCategories)];
    setCategories(uniqueCategories);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleSearchChange = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Daily Habit Tracker</h1>
      <div className="mb-4 flex justify-between items-center">
        <FilterBar
          categories={categories}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Habit
        </button>
      </div>
      <HabitList
        habits={habits}
        onUpdate={loadHabits}
        onEdit={handleEditHabit}
      />
      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onHabitAdded={loadHabits}
      />
      <EditHabitModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        habit={editingHabit}
        onHabitUpdated={loadHabits}
      />
    </div>
  );
};

export default MainPage;