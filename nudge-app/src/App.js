import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import AddTask from './components/addTask';
import DateWelcome from './components/date';
import ToggleTimeCategory from './components/categoriesTime';

const Nudge = () => {
  const [tasks, setTasks] = useState([]);
  const [categoryView, setCategoryView] = useState(true);

  const addTask = () => {
    const newTask = { id: tasks.length, name: `Task ${tasks.length + 1}` };
    setTasks([...tasks, newTask]);
  };

  const toggleView = () => {
    setCategoryView(!categoryView);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
        <AddTask onAddTask={addTask} />
        <ToggleTimeCategory view={categoryView} onToggleView={toggleView} />
      </Box>
      <DateWelcome />
      <Box my={4} display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        {tasks.length === 0 && (
          <Typography variant="h6" color="textSecondary">
            all done for today!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Nudge;
