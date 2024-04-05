
import React from 'react';
import { Paper, Typography, Checkbox, FormControlLabel } from '@mui/material';

const StickyNote = ({ tasks, removeTask }) => {
  return (
    <Paper elevation={3} style={{ padding: '15px', margin: '10px', backgroundColor: '#ffff99' }}>
      {tasks.map((task, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <FormControlLabel
            control={
              <Checkbox onChange={() => removeTask(index)} />
            }
            label={
              <>
                <Typography variant="h6">{task.taskName}</Typography>
                <Typography>Time: {task.time}</Typography>
                <Typography>Date: {task.date}</Typography>
                <Typography>Location: {task.location}</Typography>
                <Typography>Priority: {task.priority ? 'High' : 'Normal'}</Typography>
                <Typography>Description: {task.description}</Typography>
              </>
            }
          />
          {index < tasks.length - 1 && <hr />}
        </div>
      ))}
    </Paper>
  );
};

export default StickyNote;
