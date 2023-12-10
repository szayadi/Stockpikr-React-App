import React, { useState } from 'react';
import { Box, Typography, Switch, FormGroup, FormControlLabel, Divider, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

interface SecuritySettingsProps {
  twoFactorAuth: boolean;
}

export const Security: React.FC<SecuritySettingsProps> = ({ twoFactorAuth }) => {
  const [twoFactorAuthToggle, setTwoFactorAuthToggle] = useState(twoFactorAuth);
  const [isChangePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleTwoFactorAuthToggle = () => {
    setTwoFactorAuthToggle(!twoFactorAuthToggle);
  };

  const handleOpenChangePasswordDialog = () => {
    setChangePasswordDialogOpen(true);
  };

  const handleCloseChangePasswordDialog = () => {
    setChangePasswordDialogOpen(false);
    setCurrentPassword('');
    setNewPassword('');
  };

  const handleChangePassword = () => {
    // Add logic to handle password change
    // For example, you can send a request to the server to change the password
    // and handle success or error accordingly
    console.log('Changing password...');
    handleCloseChangePasswordDialog();
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', borderRadius: 8 }}>
      <Box>
        <Typography variant="h4" mb={2}>
          Security Settings
        </Typography>
        <Divider />
      </Box>

      <Box mt={3}>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={twoFactorAuthToggle} onChange={handleTwoFactorAuthToggle} />}
            label="Two-Factor Authentication"
          />
        </FormGroup>
      </Box>

      <Divider sx={{ mt: 3 }} />

      <Box mt={3}>
        <Typography variant="h5" mb={2}>
          Additional Security Features
        </Typography>

        {/* Add additional security features here */}
        <FormGroup>
          <FormControlLabel
            control={<Switch />}
            label="Password Expiry Reminder"
          />
          <FormControlLabel
            control={<Switch />}
            label="Device Management"
          />
        </FormGroup>
      </Box>

      <Divider sx={{ mt: 3 }} />

      <Box mt={3}>
        <Button variant="outlined" color="primary" onClick={handleOpenChangePasswordDialog}>
          Change Password
        </Button>
      </Box>

      <Dialog open={isChangePasswordDialogOpen} onClose={handleCloseChangePasswordDialog}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangePasswordDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleChangePassword} color="primary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
