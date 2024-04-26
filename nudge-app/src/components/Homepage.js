import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import AddTask from './addTask.js';
import DateWelcome from './date.js';
import EditBackground from './editBackground.js';
import StickyNote from './StickyNote.js';

const Nudge = () => {
  const [tasks, setTasks] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('linear-gradient(blue, white, blue)');

  
  const groupedTasks = tasks.reduce((acc, task) => {
    const date = task.datetime.toISOString().split('T')[0]; 
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {});
  //group tasks by date keys
  const dates = Object.keys(groupedTasks).sort();

  const addNewTask = async (newTask) => {
    try {
      const response = await fetch('http://localhost:8000/add-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setTasks([...tasks, { ...newTask, id: data.insertedId }]); // Ensure data.insertedId is provided by your backend
    } catch (error) {
      console.error('Failed to add new task:', error);
    }
  };
  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  
  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  

  useEffect(() => {
    console.log("Setting background image to", backgroundImage)
  }, [backgroundImage]);

  
  return (
    <Container style={{ backgroundColor: '#F8F1E7', minHeight: '100vh' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
            <AddTask onAddTask={addNewTask} />
            <EditBackground image={backgroundImage} setImage={setBackgroundImage}/>
        </Box>
        <DateWelcome />
        <Box my={4} display="flex" flexDirection="column" alignItems="center" gap="20px"
        style={{backgroundImage:backgroundImage, backgroundSize:'100%'}}>
            {dates.length > 0 ? (
          dates.map((date, index) => (
            <StickyNote
              key={date}
              date={date}
              index={index}
              tasks={groupedTasks[date]}
              toggleCompletion={toggleCompletion}
              removeTask={removeTask}
            />
          ))
            ) : (
                <Typography variant="h6" color="textSecondary">
                    all done for today!
                </Typography>
            )}
        </Box>
    </Container>
);
};

export default Nudge;
