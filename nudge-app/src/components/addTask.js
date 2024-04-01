// AddTask.js
import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskForm from './TaskForm'; 

const AddTask = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
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
      <TaskForm open={open} handleClose={handleClose} />
    </>
  );
};

export default AddTask;