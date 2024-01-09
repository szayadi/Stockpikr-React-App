// ContactUsPage.tsx

import { Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';

const ContactUsPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your contact form submission logic here
    alert('Form submitted!');
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        Have questions or feedback? Reach out to us by filling out the form below.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField label="Your Name" fullWidth margin="normal" variant="outlined" required />
        <TextField label="Your Email" fullWidth margin="normal" variant="outlined" type="email" required />
        <TextField label="Message" fullWidth margin="normal" variant="outlined" multiline rows={4} required />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ContactUsPage;
