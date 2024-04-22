import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import AddTask from './addTask.js';
import DateWelcome from './date.js';
import EditBackground from './editBackground.js';
import StickyNote from './StickyNote.js';

//TODO: connect to database (don't need to worry about this for hw 5)
const Nudge = () => {
  const [tasks, setTasks] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('linear-gradient(red, blue, red)');

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
        setTasks([...tasks, { ...newTask, id: data.insertedId }]); 
        console.log("Adding new task:", newTask); 
    } catch (error) {
        console.error('Failed to add new task:', error);
    }
};
  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, taskIndex) => {
      if (taskIndex === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));  // Remove task by index
  };

  useEffect(() => {
    console.log("Setting background image to", backgroundImage)
  }, [backgroundImage]);

  //TODO: allow user to check off tasks (need some way to decrease tasks.length)
  return (
    <Container >
        <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
            <AddTask onAddTask={addNewTask} />
            <EditBackground image={backgroundImage} setImage={setBackgroundImage}/>
        </Box>
        <DateWelcome />
        <Box my={4} display="flex" justifyContent="center" alignItems="center" minHeight="200px"
        style={{backgroundImage:backgroundImage, backgroundSize:'100%'}}>
            {tasks.length > 0 ? (
                <StickyNote tasks={tasks} toggleCompletion={toggleCompletion} removeTask={removeTask} />
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
