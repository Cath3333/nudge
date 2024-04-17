import React from 'react';
import { Paper, Typography, Checkbox, FormControlLabel, Button } from '@mui/material';

const StickyNote = ({ tasks, toggleCompletion, removeTask }) => {
    const completedTasksCount = tasks.filter(task => task.completed).length;
    const totalTasksCount = tasks.length;
    const borderColor = `rgba(0, 0, 0, ${completedTasksCount / totalTasksCount})`; // This will determine the fill of the border

    return (
        <Paper elevation={3} style={{ padding: '15px', margin: '10px', backgroundColor: '#ffff99', border: `4px solid ${borderColor}` }}>
            {tasks.map((task, index) => (
                <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ opacity: task.completed ? 0.3 : 1, flex: 1 }}>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={task.completed}
                                    onChange={() => toggleCompletion(index)}
                                    disabled={task.completed}
                                />
                            }
                            label={
                                <div style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    <Typography variant="h6">{task.taskName}</Typography>
                                    {/* <Typography>Time: {task.time}</Typography>
                                    <Typography>Date: {task.date}</Typography> */}
                                    <Typography> Date & Time: {task.datetime}</Typography>
                                    <Typography>Location: {task.location}</Typography>
                                    <Typography>Priority: {task.priority ? 'High' : 'Normal'}</Typography>
                                    <Typography>Description: {task.description}</Typography>
                                </div>
                            }
                        />
                    </div>
                    <Button onClick={() => removeTask(index)} color="secondary" style={{ marginLeft: '10px' }}>Remove</Button>
                    {index < tasks.length - 1 && <hr />}
                </div>
            ))}
        </Paper>
    );
};

export default StickyNote;
