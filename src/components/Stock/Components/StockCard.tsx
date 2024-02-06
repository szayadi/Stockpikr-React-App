import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { dateFormatter } from '../../../helper/dateFormatter';
import { numberFormatter } from '../../../helper/numberFormatter';
import { IStockQuote } from '../../../interfaces/IStockQuote';
import StatBox from '../../Dashboard/Statbox';

interface StockCardProps {
  stock: IStockQuote;
}

const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <StatBox stock={stock} />
        <Grid container>
          <Grid item xs={6}>
            <Typography
              variant="body1"
              textAlign="left"
              sx={{ borderBottom: '1px solid lightgray', marginRight: '40px', marginTop: '10px' }}
            >
              Shares Outstanding: <b>{numberFormatter.format(stock.sharesOutstanding)}</b>
            </Typography>
            <Typography
              variant="body1"
              textAlign="left"
              sx={{ borderBottom: '1px solid lightgray', marginRight: '40px', marginTop: '10px' }}
            >
              Market Cap: <b>{numberFormatter.format(stock.marketCap)}</b>
            </Typography>
            <Typography
              variant="body1"
              textAlign="left"
              sx={{ borderBottom: '1px solid lightgray', marginRight: '40px', marginTop: '10px' }}
            >
              Volume: <b>{numberFormatter.format(stock.volume)}</b>
            </Typography>
            <Typography
              variant="body1"
              textAlign="left"
              sx={{ borderBottom: '1px solid lightgray', marginRight: '40px', marginTop: '10px' }}
            >
              Average Volume: <b>{numberFormatter.format(stock.avgVolume)}</b>
            </Typography>
            <Typography
              variant="body1"
              textAlign="left"
              sx={{ borderBottom: '1px solid lightgray', marginRight: '40px', marginTop: '10px' }}
            >
              Day Range: <b>{numberFormatter.format(stock.dayLow)}</b> - <b>{numberFormatter.format(stock.dayHigh)}</b>
            </Typography>
            <Typography
              variant="body1"
              textAlign="left"
              sx={{ borderBottom: '1px solid lightgray', marginRight: '40px', marginTop: '10px' }}
            >
              52 Week Range: <b>{numberFormatter.format(stock.yearLow)}</b> -{' '}
              <b>{numberFormatter.format(stock.yearHigh)}</b>
            </Typography>
            <Typography
              variant="body1"
              textAlign="left"
              sx={{ borderBottom: '1px solid lightgray', marginRight: '40px', marginTop: '10px' }}
            >
              Price Average 50: <b>{numberFormatter.format(stock.priceAvg50)}</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="body1"
              textAlign="left"
              sx={{ borderBottom: '1px solid lightgray', marginRight: '40px', marginTop: '10px' }}
            >
              Price Average 200: <b>{numberFormatter.format(stock.priceAvg200)}</b>
            </Typography>
            <Typography
              variant="body1"
              textAlign="left"
              sx={{ borderBottom: '1px solid lightgray', marginRight: '40px', marginTop: '10px' }}
            >
              Exchange: <b>{stock.exchange}</b>
            </Typography>
            <Typography
              variant="body1"
              textAlign="left"
              sx={{ borderBottom: '1px solid lightgray', marginRight: '40px', marginTop: '10px' }}
            >
              Open: <b>{numberFormatter.format(stock.open)}</b>
            </Typography>
            <Typography
              variant="body1"
              textAlign="left"
              sx={{ borderBottom: '1px solid lightgray', marginRight: '40px', marginTop: '10px' }}
            >
              Previous Close: <b>{numberFormatter.format(stock.previousClose)}</b>
            </Typography>
            <Typography
              variant="body1"
              textAlign="left"
              sx={{ borderBottom: '1px solid lightgray', marginRight: '40px', marginTop: '10px' }}
            >
              Earnings Per Share (EPS): <b>{stock.eps || '-'}</b>
            </Typography>
            <Typography
              variant="body1"
              textAlign="left"
              sx={{ borderBottom: '1px solid lightgray', marginRight: '40px', marginTop: '10px' }}
            >
              PE Ratio: <b>{stock.pe || '-'}</b>
            </Typography>
            <Typography
              variant="body1"
              textAlign="left"
              sx={{ borderBottom: '1px solid lightgray', marginRight: '40px', marginTop: '10px' }}
            >
              Earnings Announcement: <b>{dateFormatter(stock.earningsAnnouncement)}</b>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StockCard;
