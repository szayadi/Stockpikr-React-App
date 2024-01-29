import { Grid, Typography } from '@mui/material';
import React from 'react';
import Portfolio from './Portfolio';

const Dashboard: React.FC = () => {
  return (
    <Grid container xs={12} sx={{ marginTop: '20px', justifyContent: 'center' }} item={true}>
      <Grid xs={12} sm={8} item={true}>
        <Typography variant="h5" sx={{ border: '1px solid black', backgroundColor: 'lightgrey' }}>
          Portfolio
          <Portfolio />
        </Typography>
      </Grid>
      <Grid sx={{ display: 'flex', marginLeft: '10px', justifyContent: 'flex-end' }}>
        <Typography variant="h5" sx={{ border: '1px solid black', backgroundColor: 'lightgrey' }}>
          Stats
          {/* <StatBox title="123.45" subtitle="Active Gains" difference="4%" />
          <StatBox title="54.32" subtitle="Active Losses" difference="-14%" /> */}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
