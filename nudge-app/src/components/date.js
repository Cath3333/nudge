import React from 'react';
import { Typography } from '@mui/material';

const DateWelcome = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Typography variant="h5" align="center">
        {today}
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome, Jenny
      </Typography>
    </>
  );
};

export default DateWelcome;
