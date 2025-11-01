import React, { useEffect, useState } from 'react';
import api from '../api/api';
import io from 'socket.io-client';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000';

export default function Dashboard(){
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  useEffect(() => {
    async function load(){ try { const r = await api.get('/tasks'); setTasks(r.data); } catch(e){ console.error(e); } }
    load();
    const socket = io(SOCKET_URL, { transports: ['websocket'] });
    socket.on('connect', () => { if (user && user.id) socket.emit('join', user.id); });
    socket.on('task_created', (t) => setTasks(prev => [t, ...prev]));
    socket.on('task_updated', (t) => setTasks(prev => prev.map(p => p.id === t.id ? t : p)));
    socket.on('task_deleted', ({ id }) => setTasks(prev => prev.filter(p => p.id !== id)));
    return () => { if (user && user.id) socket.emit('leave', user.id); socket.disconnect(); };
  }, [user.id]);

  const handleCreated = (task) => setTasks(prev => [task, ...prev]);
  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}</h1>
      <TaskForm onCreated={handleCreated}/>
      <div className="task-list">
        {tasks.map(t => <TaskItem key={t.id} task={t} onChange={setTasks} />)}
      </div>
    </div>
  );
}
