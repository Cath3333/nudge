
// React component that represents a sticky note with check boxes and text fields
import React from 'react';
import { Paper, Typography } from '@mui/material';
//TODO: change backgroundcolor logic to reflect categories if categories mode is on
const StickyNote = ({ tasks }) => {
  return (          
    <Paper elevation={3} style={{ padding: '15px', margin: '10px', backgroundColor: '#ffff99' }}>
      {tasks.length > 0 ? (
        (tasks || []).map((task, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <Typography variant="h6">{task.taskName}</Typography>
            <Typography>Time: {task.time}</Typography>
            <Typography>Date: {task.date}</Typography>
            <Typography>Location: {task.location}</Typography>
            <Typography>Priority: {task.priority ? 'High' : 'Normal'}</Typography>
            <Typography>Description: {task.description}</Typography>
            {index < tasks.length - 1 && <hr />}
          </div>
        ))
      ) : (
        <Typography variant="h6" color="textSecondary">
          No tasks added yet!
        </Typography>
      )}
    </Paper>
  );
};

export default StickyNote;

