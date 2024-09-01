import React from 'react';
import HabitItem from './HabitItem';

const HabitList = ({ habits, onUpdate, onEdit }) => {
  return (
    <div className="space-y-4">
      {habits.map((habit) => (
        <HabitItem key={habit._id} habit={habit} onUpdate={onUpdate} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default HabitList;