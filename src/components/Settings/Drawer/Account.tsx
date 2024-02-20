import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, Divider, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { UserApiService } from '../../../services/UserApiService';
import { AccountForm, IAccountField, accountFields } from './AccountForm';
import {IAccountValues} from '../../../interfaces/IAccountValues';

export const Account: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [accountValues, setAccountValues] = useState<IAccountValues>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePic: ''
  });

  React.useEffect(() => {
    const queryUserInfo = async () => {
      const user = await UserApiService.fetchUserDetails();
      if (user) {
        setAccountValues({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          profilePic: user.profilePic
        });
      }
    };
    queryUserInfo();
  }, []);

  const handleFormSubmit = (values: IAccountValues) => {
    setAccountValues(values);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', borderRadius: 8 }}>
      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
        <Avatar sx={{ bgcolor: 'f4f', width: 100, height: 100 }} src={accountValues.profilePic}></Avatar>
        <Typography variant="h5" mt={2}>
          {accountValues.firstName} {accountValues.lastName}
        </Typography>
      </Box>

      <Divider sx={{ marginBottom: 2 }} />

      {isEditing ? (
        <AccountForm initialValues={accountValues as IAccountValues} onSubmit={handleFormSubmit} />
      ) : (
        <Box display="grid" gap={2}>
          {accountFields.map(({ label, name, type }: IAccountField) => (
            <TextField
              key={name}
              fullWidth
              variant="outlined"
              type={type}
              label={label}
              value={accountValues[name]}
              name={name}
              disabled={!isEditing}
            />
          ))}

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="outlined" startIcon={<EditIcon />} onClick={handleEditClick}>
              Edit
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};
