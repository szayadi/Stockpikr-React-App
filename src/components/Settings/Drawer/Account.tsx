import { Avatar, Box, Divider, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IAccountValues } from '../../../interfaces/IAccountValues';
import { UserApiService } from '../../../services/UserApiService';

export interface IAccountField {
  label: string;
  name: string;
  type: string;
}

export const accountFields: IAccountField[] = [
  { label: 'First Name', name: 'firstName', type: 'text' },
  { label: 'Last Name', name: 'lastName', type: 'text' },
  { label: 'Email ID', name: 'email', type: 'text' },
  { label: 'Phone Number', name: 'phoneNumber', type: 'tel' }
];

export const Account: React.FC = () => {
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

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', borderRadius: 8 }}>
      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
        <Avatar sx={{ bgcolor: 'f4f', width: 100, height: 100 }} src={accountValues.profilePic}></Avatar>
        <Typography variant="h5" mt={2}>
          {accountValues.firstName} {accountValues.lastName}
        </Typography>
      </Box>

      <Divider sx={{ marginBottom: 2 }} />

      <Box display="grid" gap={2}>
        {accountFields.map(({ label, name, type }: IAccountField) => (
          <Typography key={name} variant="body1">
            {label}: {accountValues[name]}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};
