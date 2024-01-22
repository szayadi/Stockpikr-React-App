import { Button, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <Container
      maxWidth="md"
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '50px' }}
    >
      <div style={{ flex: 1 }}>
        {/* Placeholder Image */}
        <img
          src="https://via.placeholder.com/150"
          alt="StockPikr Logo"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </div>
      <div style={{ flex: 1, marginLeft: '20px', textAlign: 'left' }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Create your Watchlist
        </Typography>
        <Typography variant="body1" paragraph color="textSecondary">
          Create a free StockPikr account to build your Watchlist. Explore amazing features:
        </Typography>
        <List>
          <ListItem>
            <ListItemText>
              <Typography variant="body1" color="textSecondary">
                Provides easy filtering and viewing of watchlists
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="body1" color="textSecondary">
                Track stock price movement on one screen
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="body1" color="textSecondary">
                Comprehensive analysis on individual stocks
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="body1" color="textSecondary">
                Build a plan before investing your money
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <Button variant="contained" color="primary" component={Link} to="/dashboard" style={{ marginTop: '20px' }}>
          Go to Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default LandingPage;
