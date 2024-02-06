import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface UserSettingsDialogProps {
  open: boolean;
  handleClose: () => void;
  initialValues: { [key: string]: string };
}

export interface IAccountField {
  label: string;
  name: string;
  type: string;
}

export const accountFields: IAccountField[] = [
  { label: 'First Name', name: 'firstName', type: 'text' },
  { label: 'Last Name', name: 'lastName', type: 'text' },
  { label: 'Address', name: 'address', type: 'text' },
  { label: 'Phone Number', name: 'phoneNumber', type: 'tel' }
];

const UserSettingsDialog: React.FC<UserSettingsDialogProps> = ({ open, handleClose, initialValues }) => {
  const [accountValues, setAccountValues] = useState<{ [key: string]: string }>(initialValues);

  useEffect(() => {
    setAccountValues(initialValues);
  }, [initialValues]);

  const handleSubmit = () => {
    handleClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation(); // Prevent the event from propagating to the dialog
  };

  return (
    <Dialog open={open} onClose={handleClose} BackdropComponent={Backdrop} onClick={handleBackdropClick} maxWidth="lg">
      <DialogTitle>User Settings</DialogTitle>
      <DialogContent>
        <Box m="20px" sx={{ margin: '40px' }}>
          {accountFields.map(({ label, name, type }: IAccountField) => (
            <TextField
              key={name}
              fullWidth
              variant="filled"
              type={type}
              label={label}
              value={accountValues[name] || ''}
              name={name}
              onChange={(e) => setAccountValues({ ...accountValues, [name]: e.target.value })}
              sx={{ marginBottom: '20px' }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserSettingsDialog;
