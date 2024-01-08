import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { ISubmitProp } from '../../interfaces/ISubmitProp';

export interface IAccountField {
  label: string;
  name: string;
  type: string;
}

export const accountFields: IAccountField[] = [
  { label: 'First Name', name: 'firstName', type: 'text' },
  { label: 'Last Name', name: 'lastName', type: 'text' },
  { label: 'Address', name: 'address', type: 'text' },
  { label: 'Phone Number', name: 'phoneNumber', type: 'tel' },
];

export const AccountForm: React.FC<ISubmitProp> = ({ initialValues, onSubmit }) => {
  const [accountValues, setAccountValues] = useState<{ [key: string]: string }>(initialValues);

  useEffect(() => {
    setAccountValues(initialValues);
  }, [initialValues]);

  const accountFields: IAccountField[] = [
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
          {accountFields.map(({ label, name, type }: IAccountField) => (
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