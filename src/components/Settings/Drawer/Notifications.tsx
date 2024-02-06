import { Box, Divider, FormControlLabel, FormGroup, Paper, Switch, Typography } from '@mui/material';
import React, { useState } from 'react';

interface NotificationsProps {
  emailNotifications: boolean;
  phoneNotifications: boolean;
}

export const Notifications: React.FC<NotificationsProps> = ({ emailNotifications, phoneNotifications }) => {
  const [emailToggle, setEmailToggle] = useState(emailNotifications);
  const [phoneToggle, setPhoneToggle] = useState(phoneNotifications);

  const handleEmailToggle = () => {
    setEmailToggle(!emailToggle);
  };

  const handlePhoneToggle = () => {
    setPhoneToggle(!phoneToggle);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', borderRadius: 8 }}>
      <Box>
        <Typography variant="h4" mb={2}>
          Notifications
        </Typography>
        <Divider />
      </Box>

      <Box mt={3}>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={emailToggle} onChange={handleEmailToggle} />}
            label="Email Notifications"
          />
          <FormControlLabel
            control={<Switch checked={phoneToggle} onChange={handlePhoneToggle} />}
            label="Phone Notifications"
          />
        </FormGroup>
      </Box>

      <Divider sx={{ mt: 3 }} />

      <Box mt={3}>
        <Typography variant="h5" mb={2}>
          Customization
        </Typography>

        <FormGroup>
          <FormControlLabel control={<Switch />} label="Allow Push Notifications" />
          <FormControlLabel control={<Switch />} label="Show Preview in Notifications" />
        </FormGroup>
      </Box>
    </Paper>
  );
};
