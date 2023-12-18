import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Typography } from '@mui/material';
import React from 'react';
import StatBox from './Statbox';
import Portfolio from './Portfolio';

const portfolioData = [
  { symbol: 'AAPL', name: 'Apple Inc.', quantity: 10, avgPrice: 150.0 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 5, avgPrice: 2800.0 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3300.0, change: 10.0 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 320.0, change: -5.0 },
  { symbol: 'NFLX', name: 'Netflix Inc.', changePercent: 5.0 },
  { symbol: 'TSLA', name: 'Tesla Inc.', changePercent: 3.0 },
];

const Dashboard: React.FC = () => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* Portfolio Box */}
        <Box sx={{ backgroundColor: 'lightgrey', color: 'black', border: '1px solid black', margin: '15px', width: '65%', height: '300px' }}>
          <Typography variant="h5">
            Portfolio
          </Typography>
          <Box>
            <Portfolio data={portfolioData} columns={['Symbol', 'Name', 'Quantity', 'Average Price']} />
          </Box>
        </Box>

        {/* Active Stocks Box */}
        <Box sx={{ backgroundColor: 'lightgrey', color: 'black', border: '1px solid black', margin: '15px', width: '35%' }}>
          <Typography variant="h5">
            Active Stocks
          </Typography>
        </Box>
      </Box>

      {/* StatBoxes */}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', top: '0' }}>
        <Box sx={{ backgroundColor: 'lightgrey', color: 'black', border: '1px solid black', margin: '15px', padding: '20px', top: '0' }}>
          <StatBox
            title="12,361"
            subtitle="Active Gains"
            progress="0.75"
            difference="14%"
            icon={
              <TrendingUpIcon
                sx={{ color: 'green', fontSize: '20px' }}
              />
            }
          />
        </Box>

        <Box sx={{ backgroundColor: 'lightgrey', color: 'black', border: '1px solid black', margin: '15px', padding: '20px' }}>
          <StatBox
            title="12,361"
            subtitle="Active Losses"
            progress="0.75"
            difference="-14%"
            icon={
              <TrendingDownIcon
                sx={{ color: 'red', fontSize: '20px' }}
              />
            }
          />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
