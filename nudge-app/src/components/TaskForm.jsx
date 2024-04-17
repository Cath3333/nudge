import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import './TaskForm.css';

const TaskForm = ({ open, handleClose, addNewTask }) => {
  const [taskDetails, setTaskDetails] = useState({
    taskName: '',
    date: new Date(),
    time: new Date(),
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



  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      userId: localStorage.getItem('userId'),
      name: taskDetails.taskName,
      description: taskDetails.description,
      date: taskDetails.date.toISOString().split('T')[0],
      time: taskDetails.time.toTimeString().split(' ')[0],
      location: taskDetails.location,
      priority: taskDetails.priority,
      completed: false
    };
    addNewTask(taskData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
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
            <DatePicker
              label="Date"
              value={taskDetails.date}
              onChange={(newValue) => {
                setTaskDetails({ ...taskDetails, date: newValue });
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <TimePicker
              label="Time"
              value={taskDetails.time}
              onChange={(newValue) => {
                setTaskDetails({ ...taskDetails, time: newValue });
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
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
