import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleSearch = () => {
    // Assuming you have a route named '/search', you can update it as needed
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ width: "100vh", padding: 3 }}>
        <Box component="form" sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="search"
            label="Company or Stock Symbol"
            name="search"
            autoComplete="search"
            sx={{ flexGrow: 1 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            sx={{ ml: 2 }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>

        {/* Rest of your dashboard content */}
      </Grid>
    </Grid>
  );
}
