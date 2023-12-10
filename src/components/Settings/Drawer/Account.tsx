import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Avatar, Divider, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { AccountForm } from './AccountForm';

interface AccountField {
  label: string;
  name: string;
  type: string;
}

export const Account: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [accountValues, setAccountValues] = useState<{ [key: string]: string }>({
    // Placeholder values
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    phoneNumber: '555-1234',
  });

  const accountFields: AccountField[] = [
    { label: 'First Name', name: 'firstName', type: 'text' },
    { label: 'Last Name', name: 'lastName', type: 'text' },
    { label: 'Address', name: 'address', type: 'text' },
    { label: 'Phone Number', name: 'phoneNumber', type: 'tel' },
  ];

  const handleFormSubmit = (values: { [key: string]: string }) => {
    setAccountValues(values);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', borderRadius: 8 }}>
      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
        <Avatar sx={{ bgcolor: "f4f", width: 100, height: 100 }}>JD</Avatar>
        <Typography variant="h5" mt={2}>
          {accountValues.firstName} {accountValues.lastName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Stock Investor
        </Typography>
      </Box>

      <Divider sx={{ marginBottom: 2 }} />

      <Box display="grid" gap={2}>
        {accountFields.map(({ label, name, type }: AccountField) => (
          <TextField
            key={name}
            fullWidth
            variant="outlined"
            type={type}
            label={label}
            value={accountValues[name]}
            name={name}
            disabled={!isEditing} // Disable editing when not in edit mode
          />
        ))}

        {isEditing && (
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => setIsEditing(false)}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Box>

      {!isEditing && (
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </Box>
      )}

      {isEditing && <AccountForm initialValues={accountValues} onSubmit={handleFormSubmit} />}
    </Paper>
  );
};
