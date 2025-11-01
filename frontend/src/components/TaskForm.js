import React, { useState } from 'react';
import api from '../api/api';

export default function TaskForm({ onCreated }){
  const [title,setTitle]=useState(''); const [description,setDescription]=useState(''); const [priority,setPriority]=useState('medium'); const [dueDate,setDueDate]=useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const r = await api.post('/tasks', { title, description, priority, due_date: dueDate, status: 'todo' });
      setTitle(''); setDescription(''); setPriority('medium'); setDueDate('');
      onCreated(r.data);
    } catch (err) {
      alert('Error creating task');
    }
  };

  return (
    <form className="task-form" onSubmit={submit}>
      <input required placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <select value={priority} onChange={e=>setPriority(e.target.value)}>
        <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
      </select>
      <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
      <button>Create Task</button>
    </form>
  );
}
