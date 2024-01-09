import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
  Grid, Typography
} from '@mui/material';
import React from 'react';
import Portfolio from './Portfolio';
import StatBox from './Statbox';


const Dashboard: React.FC = () => {
  return (
    <Grid container xs={12} spacing={2} sx={{margin: '10px', justifyContent: 'center'}}>
        <Grid xs={12} sm={8}>
        <Typography variant='h5' sx={{border: "1px solid black", backgroundColor: "lightgrey"}}>
          Portfolio
          <Portfolio/>
        </Typography>
        </Grid>
        <Grid sx={{display: 'flex', marginLeft: '10px', justifyContent: 'flex-end'}} >
          <Typography variant='h5' sx={{border: "1px solid black", padding: '0 10px', backgroundColor: "lightgrey"}}>
            Stats
            <StatBox
              title="123.45"
              subtitle="Active Gains"
              difference="4%"
              icon={<TrendingUpIcon sx={{color: 'green', fontSize: '20px' }} />}
            />
             <StatBox
              title="54.32"
              subtitle="Active Losses"
              difference="-14%"
              icon={<TrendingUpIcon sx={{ color: 'green', fontSize: '20px' }} />}
            />
          </Typography>
        </Grid>
    </Grid>
  );
};

export default Dashboard;
