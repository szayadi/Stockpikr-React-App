import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { IStockDetails } from '../../interfaces/IStockDetails';
import { createPortfolioDataFromJson } from '../Helper';

export const StockDetails: React.FC = () => {
  const [detailsData, setDetailsData] = useState<IStockDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = require('../../assets/mock_data.json');
        const stockData: IStockDetails[] = json.stocks || [];
        const stock = stockData.find((stock) => stock.symbol === 'MSFT');

        if (stock) {
          const stockEntry = createPortfolioDataFromJson(stock.symbol, stock);
          setDetailsData(stockEntry);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
