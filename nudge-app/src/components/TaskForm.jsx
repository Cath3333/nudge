import React, { useState, useEffect } from 'react';

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import './TaskForm.css';


const TaskForm = ({ open, handleClose, addNewTask }) => {
  const [taskDetails, setTaskDetails] = useState({
    taskName: '',

    datetime: new Date(),

    location: '',
    priority: false,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setTaskDetails({
      ...taskDetails, 
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCloseAndReset = () => {
    // Call the original handleClose function passed via props
    handleClose();
  
    // Reset the task details
    setTaskDetails({
      taskName: '',
      datetime: new Date(),
      location: '',
      priority: false,
      description: ''
    });
  };

  // Reset date and time fields when form is opened
  useEffect(() => {
    if (open) {
      setTaskDetails(prevDetails => ({
        ...prevDetails,
        datetime: new Date() // Set default value to current date and time
      }));
    }
  }, [open]);

  const handleSubmit = async (e) => {

    console.log('Form submitted at ' + Date.now());

    e.preventDefault();
    if (!taskDetails.taskName.trim()) {
      alert("Please enter a task name.");
      return;
    }
    const taskData = {
      userId: localStorage.getItem('userId'),
      name: taskDetails.taskName || "",
      description: taskDetails.description || "",

      datetime: taskDetails.datetime,

      location: taskDetails.location || "",
      priority: taskDetails.priority || false,
      completed: false
    };
    addNewTask(taskData);
    handleCloseAndReset();


    // clear task details
    setTaskDetails({
      taskName: '',
      datetime: new Date(),
      location: '',
      priority: false,
      description: ''
    });
};



  return (
    <Dialog open={open} onClose={handleCloseAndReset}>
      <DialogTitle>Add New Task</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="taskName"
            label="Task Name"
            type="text"
            fullWidth
            value={taskDetails.taskName}
            onChange={handleChange}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date & Time"
              // views={['year', 'month', 'day', 'hours', 'minutes']}
              value={taskDetails.datetime}
              onChange={(newValue) => {
                setTaskDetails({ ...taskDetails, datetime: newValue });
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
              sx={{ margin: '1rem 0'}}
            />
          </LocalizationProvider>

          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={taskDetails.location}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox name="priority" checked={taskDetails.priority} onChange={handleChange} />}
            label="Priority"
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={taskDetails.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Task</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;
