import React, { useState } from 'react';
import { Container, Box, Button, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import StickyNote from './StickyNote';

const Nudge = () => {
    const [tasks, setTasks] = useState([]);
    const [isEditMode, setIsEditMode] = useState({});
    const navigate = useNavigate();

    const addNewTask = () => {
        const newTask = { id: Date.now(), name: '', datetime: '', location: '', description: '', completed: false, priority: false };
        setTasks([...tasks, newTask]);
        setIsEditMode({ ...isEditMode, [newTask.id]: true });
    };

    const updateTask = (id, updatedTask) => {
        const updatedTasks = tasks.map(task => task.id === id ? updatedTask : task);
        setTasks(updatedTasks);
    };

    const toggleCompletion = (id) => {
        updateTask(id, { ...tasks.find(task => task.id === id), completed: !tasks.find(task => task.id === id).completed });
    };

    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleLogout = () => {
        navigate('/login');
    };

    const today = new Date();

    return (
        <Container>
            <AppBar position="static" color="default" elevation={0}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={addNewTask}>
                        <AddIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
                        Welcome!<br/>
                        <span style={{ fontSize: 16, color: '#666' }}>{today.toLocaleDateString()}</span>
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box my={4} display="flex" flexDirection="column" alignItems="center" gap="20px">
                {tasks.map((task, index) => (
                    <StickyNote
                        key={task.id}
                        task={task}
                        index={index}
                        toggleCompletion={toggleCompletion}
                        removeTask={removeTask}
                        updateTask={updateTask}
                        setEditMode={setIsEditMode}
                        isEditMode={isEditMode}
                    />
                ))}
            </Box>
        </Container>
    );
};

export default Nudge;
