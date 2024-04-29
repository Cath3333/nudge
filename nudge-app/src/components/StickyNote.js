import React from 'react';
import { Paper, Typography, Checkbox, FormControlLabel, TextField, Button } from '@mui/material';
import Draggable from 'react-draggable';

const StickyNote = ({ task, toggleCompletion, removeTask, updateTask, index, setEditMode, isEditMode }) => {
    const colors = ['#92ADDC', '#DBE5F3', '#FCB8AB', '#F9BEC2', '#FAE3C3', '#CCE2CB'];  // Updated list with 6 colors

    const bgColor = colors[index % colors.length];

    const handleDone = () => {
        setEditMode({ ...isEditMode, [task.id]: false });
    };

    return (
        <Draggable>
            <Paper elevation={3} style={{
                padding: '10px',
                margin: '10px',
                backgroundColor: bgColor,
                width: isEditMode[task.id] ? '300px' : '200px',
                border: task.priority ? '3px solid red' : `1px solid ${bgColor}`,
                cursor: 'move'
            }}>
                {isEditMode[task.id] ? (
                    <>
                        <TextField
                            fullWidth
                            margin="dense"
                            label="Task Name"
                            type="text"
                            value={task.name}
                            onChange={e => updateTask(task.id, { ...task, name: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            label="Date & Time"
                            type="datetime-local"
                            value={task.datetime}
                            onChange={e => updateTask(task.id, { ...task, datetime: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            label="Location"
                            value={task.location}
                            onChange={e => updateTask(task.id, { ...task, location: e.target.value })}
                        />
                        <Button onClick={handleDone} color="primary" style={{ marginTop: '10px' }}>Done</Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h6">{task.name}</Typography>
                        {task.datetime && <Typography>{new Date(task.datetime).toLocaleDateString()}</Typography>}
                        {task.location && <Typography>{task.location}</Typography>}
                        <FormControlLabel
                            control={<Checkbox checked={task.completed} onChange={() => toggleCompletion(task.id)} />}
                            label={<Typography style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>Completed</Typography>}
                        />
                        <Button onClick={() => removeTask(task.id)} color="secondary">Remove</Button>
                    </>
                )}
            </Paper>
        </Draggable>
    );
};

export default StickyNote;
