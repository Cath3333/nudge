import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import AddTask from './components/addTask';
import DateWelcome from './components/date';
import ToggleTimeCategory from './components/categoriesTime';
import StickyNote from './components/StickyNote.js';

//TODO: connect to database (don't need to worry about this for hw 5)
const Nudge = () => {
  const [tasks, setTasks] = useState([]);
  const [categoryView, setCategoryView] = useState(true);

  const addNewTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };
  const removeTask = (index) => {
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  }

//TODO: make this change reflect the ordering/display of tasks
  const toggleView = () => {
    setCategoryView(!categoryView);
  };

  //TODO: allow user to check off tasks (need some way to decrease tasks.length)
  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
        <AddTask onAddTask={addNewTask} />
        <ToggleTimeCategory view={categoryView} onToggleView={toggleView} />
      </Box>
      <DateWelcome />
      <Box my={4} display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        {tasks.length > 0 ? (
          <StickyNote  tasks={tasks} removeTask={removeTask} />
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
