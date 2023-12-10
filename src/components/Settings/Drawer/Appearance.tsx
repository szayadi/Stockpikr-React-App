import React from 'react';
import { Box, Typography, Switch, Paper } from "@mui/material";

interface AppearanceSettingsProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Appearance: React.FC<AppearanceSettingsProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: 'auto', borderRadius: 8 }}>
      <Box>
        <Typography variant="h5" mb={2}>
          Appearance Settings
        </Typography>
      </Box>

      <Box mt={3} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body1">
          {darkMode ? 'Dark Mode' : 'Light Mode'}
        </Typography>
        <Switch
          checked={darkMode}
          onChange={toggleDarkMode}
          color="primary"
          inputProps={{ 'aria-label': 'Toggle dark mode' }}
        />
      </Box>
    </Paper>
  );
};
