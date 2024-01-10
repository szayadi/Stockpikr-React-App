import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Our Website
      </Typography>
      <Typography variant="body1" paragraph>
        Explore our amazing features and services. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/dashboard">
        Go to Dashboard
      </Button>
    </Container>
  );
};

export default LandingPage;
