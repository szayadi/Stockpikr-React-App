import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

interface StatBoxProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  difference: string;
}

const StatBox: React.FC<StatBoxProps> = ({ title, subtitle, icon, difference }) => {
  let differenceColor = parseFloat(difference) > 0 ? 'green' : 'red';
  let differenceEquation = parseFloat(difference) > 0 ? '+' : '';

  return (
    <Box width="100%">
      <Box display="flex" justifyContent="center">
        <Paper
          sx={{ backgroundColor: 'white', borderRadius: '10px', margin: '10px', padding: '10px', alignItems: 'center' }}
          elevation={3}
        >
          {icon}
          <Typography variant="h4" fontWeight="bold" sx={{ color: 'black' }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'black' }}>
            {subtitle}
          </Typography>
          <Typography variant="h6" fontStyle="italic" sx={{ color: differenceColor }}>
            {differenceEquation}
            {difference}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default StatBox;
