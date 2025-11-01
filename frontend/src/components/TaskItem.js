import React from 'react';
import api from '../api/api';

export default function TaskItem({ task, onChange }) {
  const toggleStatus = async () => {
    const next = task.status === 'todo' ? 'in_progress' : task.status === 'in_progress' ? 'done' : 'todo';
    try {
      const r = await api.put(`/tasks/${task.id}`, { status: next });
      onChange(prev => prev.map(p => p.id === r.data.id ? r.data : p));
    } catch (err) { alert('Update failed'); }
  };
  const del = async () => {
    if (!confirm('Delete task?')) return;
    try {
      await api.delete(`/tasks/${task.id}`);
      onChange(prev => prev.filter(p => p.id !== task.id));
    } catch (err) { alert('Delete failed'); }
  };
  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div>Priority: {task.priority} | Status: {task.status}</div>
      <div>
        <button onClick={toggleStatus}>Toggle Status</button>
        <button onClick={del}>Delete</button>
      </div>
    </div>
  );
}
