import React, { useState } from 'react';
import { Button, TextField, DateTimePicker, DatePicker, TimePicker, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel } from '@mui/material';
//TODO: add categories field where the user can select from PREEXISTING categories (e.g. academics)

const TaskForm = ({ open, handleClose, addNewTask }) => {
  const [taskDetails, setTaskDetails] = useState({
    taskName: '',
    datetime: dayjs('2000-01-01T00:00'),
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
    console.log('Form submitted at ' + Date.now());
    e.preventDefault();
    const taskData = { 
      userId: localStorage.getItem('userId'), 
      name: taskDetails.taskName, 
      description: taskDetails.description,
      // date: taskDetails.date,
      // time: taskDetails.time,
      datetime: taskDetails.datetime,
      priority: taskDetails.priority,
      location: taskDetails.location,
      completed: false
      
    };
    addNewTask(taskData);
    console.log(taskData);
    handleClose();

    // clear task details
    setTaskDetails({
      taskName: '',
      time: '',
      date: '',
      location: '',
      priority: false,
      description: ''
    });
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
          <DateTimePicker
          label="Due Date & Time"
          value={taskDetails.datetime}
          onChange={handleChange}
        />
          {/* <DatePicker
            margin="dense"
            name="date"
            label="Due Date" 
            fullWidth
            value={taskDetails.date}
            onChange={handleChange}
          />
          <TimePicker 
          label="Time" 
          value={taskDetails.time}
          onChange={handleChange}
          /> */}
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
            control={
              <Checkbox
                name="priority"
                checked={taskDetails.priority}
                onChange={handleChange}
              />
            }
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
