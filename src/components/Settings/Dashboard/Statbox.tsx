import { Box, Typography } from '@mui/material';
import React from 'react';

interface StatBoxProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  progress: string;
  difference: string;
}

const StatBox: React.FC<StatBoxProps> = ({ title, subtitle, icon, progress, difference }) => {
  let differenceColor = (parseFloat(difference)) > 0 ? 'green' : 'red'
  let differenceEquation = (parseFloat(difference)) > 0 ? '+' : ''

  return (
    <Box width="100%">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h4" fontWeight="bold" sx={{ color: 'black' }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ color: 'black' }}>
          {subtitle}
        </Typography>
        <Typography variant="h5" fontStyle="italic" sx={{ color: differenceColor }}>
          {differenceEquation}{difference}
        </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;
