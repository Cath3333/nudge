import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskForm from './TaskForm'; 

const AddTask = ({onAddTask}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    console.log("Opening task form at " + Date.now());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        <AddIcon />
      </Button>
      <TaskForm open={open} handleClose={handleClose} addNewTask={onAddTask} />
    </>
  );
};

export default AddTask;
