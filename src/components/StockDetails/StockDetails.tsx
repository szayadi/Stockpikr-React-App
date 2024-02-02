import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { IStockQuote } from '../../interfaces/IStockQuote';

export const StockDetails: React.FC = () => {
  const [detailsData, setDetailsData] = useState<IStockQuote | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // I will fix load data on the next PR, removed mock json data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setDetailsData(null);
  }, []);

  return (
    <div>
      <div style={{ paddingLeft: '20px', color: 'black', textAlign: 'left' }}>
        {detailsData && (
          <>
            <div style={{ display: 'flex', alignItems: 'space-around' }}>
              <h1 style={{ color: 'black', textAlign: 'left' }}>
                {detailsData.name} ({detailsData.symbol})
              </h1>
              <Button style={{ borderRadius: '20', paddingLeft: '20px', display: 'flex', justifySelf: 'right' }}>
                Add To Watchlist
              </Button>
              <Button style={{ borderRadius: '20', paddingLeft: '20px', display: 'flex', justifySelf: 'right' }}>
                Buy
              </Button>
            </div>
            <h1>
              ${detailsData.price} ({detailsData.changesPercentage}%)
            </h1>
            <p>At Close: {detailsData.previousClose}</p>
            <p>Open: {detailsData.open}</p>
            <p>Day Low: {detailsData.dayLow}</p>
            <p>Day High: {detailsData.dayHigh}</p>
            <p>Year Low: {detailsData.yearLow}</p>
            <p>Year High: {detailsData.yearHigh}</p>
          </>
        )}
      </div>
    </div>
  );
};
