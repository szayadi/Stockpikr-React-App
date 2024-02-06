import { Box, Divider, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react';

export const Help: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: 'auto', borderRadius: 8 }}>
      <Box>
        <Typography variant="h5" mb={2}>
          Help & Support
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="body1">
          If you need assistance or have any questions, feel free to reach out to us:
        </Typography>
      </Box>

      <List sx={{ marginTop: 2 }}>
        <ListItem disablePadding>
          <ListItemText primary="Email Support" secondary="support@example.com" />
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemText primary="Phone Support" secondary="+1 (123) 456-7890" />
        </ListItem>
      </List>

      <Box mt={3}>
        <Typography variant="body2">For additional information, please visit our Contact page.</Typography>
      </Box>
    </Paper>
  );
};
