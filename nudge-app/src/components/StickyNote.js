import React from 'react';
import { Paper, Typography, Checkbox, TextField, Button, IconButton, FormControlLabel } from '@mui/material';
import Draggable from 'react-draggable';
import ClearIcon from '@mui/icons-material/Clear';

const StickyNote = ({ task, toggleCompletion, removeTask, updateTask, index, isEditMode, setEditMode }) => {
    const colors = ['#92ADDC', '#DBE5F3', '#FCB8AB', '#F9BEC2', '#FAE3C3', '#CCE2CB'];
    const bgColor = colors[index % colors.length];

    const handleEdit = () => setEditMode({ ...isEditMode, [task.id]: true });
    const handleDone = () => setEditMode({ ...isEditMode, [task.id]: false });

    const noteContent = (
        <Paper elevation={3} style={{
            padding: '15px',
            margin: '10px',
            backgroundColor: bgColor,
            width: isEditMode[task.id] ? '300px' : '200px',
            border: task.priority ? '3px solid red' : '1px solid #ccc',
            position: 'absolute', // ensure this is correctly set for positioning
        }}>
            {isEditMode[task.id] ? (
                <div>
                    <TextField sx={{ my: 1 }} fullWidth label="Task Name" value={task.name} onChange={(e) => updateTask(task.id, { ...task, name: e.target.value })} />
                    <TextField sx={{ my: 1 }} fullWidth InputLabelProps={{ shrink: true }} type="datetime-local" label="Date & Time" value={task.datetime || ''} onChange={(e) => updateTask(task.id, { ...task, datetime: e.target.value })} />
                    <TextField sx={{ my: 1 }} fullWidth label="Location" value={task.location || ''} onChange={(e) => updateTask(task.id, { ...task, location: e.target.value })} />
                    <TextField sx={{ my: 1 }} fullWidth label="Description" multiline rows={2} value={task.description || ''} onChange={(e) => updateTask(task.id, { ...task, description: e.target.value })} />
                    <FormControlLabel control={<Checkbox checked={task.priority} onChange={(e) => updateTask(task.id, { ...task, priority: e.target.checked })} />} label="Priority" />
                    <Button onClick={handleDone} color="primary" style={{ marginTop: '10px' }}>Done</Button>
                </div>
            ) : (
                <div>
                    <Typography variant="h6">{task.name}</Typography>
                    {task.datetime && <Typography>{new Date(task.datetime).toLocaleString()}</Typography>}
                    {task.location && <Typography>{task.location}</Typography>}
                    {task.description && <Typography>{task.description}</Typography>}
                    <FormControlLabel
                        control={<Checkbox checked={task.completed} onChange={() => toggleCompletion(task.id)} />}
                        label="Complete Task"
                    />
                    <IconButton onClick={() => removeTask(task.id)} style={{ position: 'absolute', bottom: '5px', right: '5px', color: 'red' }}>
                        <ClearIcon />
                    </IconButton>
                    <Button onClick={handleEdit} style={{ position: 'absolute', top: '5px', right: '5px' }}>Edit</Button>
                </div>
            )}
        </Paper>
    );

    const upperBound = -window.innerHeight * 0.05;
    // Only make the note draggable when not in edit mode
    return isEditMode[task.id] ? noteContent : (
        <Draggable bounds={{ top: upperBound }}>
            {noteContent}
        </Draggable>
    );
};

export default StickyNote;
