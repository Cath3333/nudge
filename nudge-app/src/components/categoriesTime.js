import React from 'react';
import { Button } from '@mui/material';

const ToggleTimeCategory = ({ view, onToggleView }) => {
  return (
    <Button variant="outlined" color="primary" onClick={onToggleView}>
      {view ? 'Categories' : 'Time'}
    </Button>
  );
};

export default ToggleTimeCategory;
