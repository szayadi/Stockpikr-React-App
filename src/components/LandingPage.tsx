import { Button, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <Container
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px'}}
    >
      <div style={{ flex: 1, alignItems: 'flex-e' }}>
        <img
          src={require('../assets/images/image-landing-page.jpg')}
          alt="StockPikr Logo"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </div>

      <div style={{padding: '20px', textAlign: 'center' }}>
        <Typography variant="h2" component="h2" color="#182b39">
         StockPikr
        </Typography>
        <Typography variant="h4" component="h4" color="#182b39">
         Create Your Watchlists
        </Typography>
        <div style={{ maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
          <Typography variant="body1" paragraph color="textSecondary">
            Create a free StockPikr account to build your Watchlist and explore amazing features:
          </Typography>
          <List style={{ maxWidth: '500px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <ListItem>
              <ListItemText>
                <Typography variant="body1" color="textSecondary">
                  ✨ Provides easy filtering and viewing of watchlists
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="body1" color="textSecondary">
                  📈 Track stock price movement on one screen
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="body1" color="textSecondary">
                  📊 Comprehensive analysis on individual stocks
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="body1" color="textSecondary">
                  📝 Build a plan before investing your money
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </div>

        <Button variant="contained" color="primary" component={Link} to="/dashboard">
          Go to Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default LandingPage;

