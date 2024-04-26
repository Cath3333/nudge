import React from 'react';
import { Paper, Typography, Checkbox, FormControlLabel, Button } from '@mui/material';

const colors = ['#92ADDC', '#DBE5F3', '#FCB8AB', '#F9BEC2', '#FAE3C3'];

const StickyNote = ({ tasks, index, toggleCompletion, removeTask }) => {
    const completedTasksCount = tasks.filter(task => task.completed).length;
    const totalTasksCount = tasks.length;
    const completionRatio = completedTasksCount / totalTasksCount; 
    const borderColor = `conic-gradient(from 0deg at 0% -1%, magenta ${90 + 90 * completionRatio}deg, ${colors[index % colors.length]} ${90 + 100 * completionRatio}deg)`;
    const bgColor = colors[index % colors.length];

    return (
        <Paper elevation={3} style={{ padding: '15px', margin: '10px', backgroundColor: bgColor, border: `4px solid ${bgColor}`,
        borderImage: `${borderColor} 1`, boxShadow: '5px 5px 15px rgba(0,0,0,0.3)'}}>
            {tasks.map((task) => (
                <div key={task.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={task.completed}
                                onChange={() => toggleCompletion(task.id)}
                                disabled={task.completed}
                            />
                        }
                        label={
                            <div style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                <Typography variant="h6">{task.name}</Typography>
                                {task.datetime && (
                                    <Typography>Date & Time: {new Date(task.datetime).toLocaleString()}</Typography>
                                )}
                                {task.location && <Typography>Location: {task.location}</Typography>}
                                {task.priority && <Typography>Priority: {task.priority ? 'High' : 'Normal'}</Typography>}
                                {task.description && <Typography>Description: {task.description}</Typography>}
                            </div>
                        }
                    />
                    <Button onClick={() => removeTask(task.id)} color="secondary" style={{ marginLeft: '10px' }}>Remove</Button>
                </div>
            ))}
        </Paper>
    );
};

export default StickyNote;
