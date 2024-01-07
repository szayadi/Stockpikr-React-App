import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { AccountField, AccountFormProps } from '../../interfaces/AccountInterfaces';


export const AccountForm: React.FC<AccountFormProps> = ({ initialValues, onSubmit }) => {
  const [accountValues, setAccountValues] = useState<{ [key: string]: string }>(initialValues);

  useEffect(() => {
    setAccountValues(initialValues);
  }, [initialValues]);

  const accountFields: AccountField[] = [
    { label: 'First Name', name: 'firstName', type: 'text' },
    { label: 'Last Name', name: 'lastName', type: 'text' },
    { label: 'Address', name: 'address', type: 'text' },
    { label: 'Phone Number', name: 'phoneNumber', type: 'tel' },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(accountValues);
  };

  return (
    <Box m="20px">
      <form onSubmit={handleFormSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: "span 4" },
          }}
        >
          {accountFields.map(({ label, name, type }: AccountField) => (
            <TextField
              key={name}
              fullWidth
              variant="filled"
              type={type}
              label={label}
              value={accountValues[name]}
              name={name}
              onChange={(e) => setAccountValues({ ...accountValues, [name]: e.target.value })}
            />
          ))}
        </Box>

        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};