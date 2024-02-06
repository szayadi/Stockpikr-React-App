import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { dateFormatter } from '../../helper/dateFormatter';
import { numberFormatter, percentageFormatter } from '../../helper/numberFormatter';
import { IStockQuote } from '../../interfaces/IStockQuote';

interface StatBoxProps {
  stock: IStockQuote;
}

const StatBox: React.FC<StatBoxProps> = ({ stock }) => {
  const isPositive = stock.changesPercentage > 0 ? 'green' : 'red';

  return (
    <Card sx={{}} elevation={0}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" fontWeight="bold" sx={{ color: 'black' }}>
              {stock.name} ({stock.symbol})
            </Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ color: 'black' }}>
              {stock.price}
            </Typography>
            <Typography variant="caption" fontWeight="italic" sx={{ color: 'black' }}>
              as of {dateFormatter(stock.timestamp)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" fontStyle="italic" sx={{ color: isPositive ? 'green' : 'red' }}>
              {numberFormatter.format(stock.change)} ({percentageFormatter(stock.changesPercentage)})
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatBox;
