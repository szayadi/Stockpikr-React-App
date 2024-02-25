import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as React from 'react';
import { numberFormatter, percentageFormatter } from '../../helper/numberFormatter';
import { IStockPriceChange } from '../../interfaces/IStockPriceChange';

const getRowId = (row: IStockPriceChange) => row.symbol;

interface DataTableProps {
  data: IStockPriceChange[];
  title: string;
}

const StockPriceChangeDataTable: React.FC<DataTableProps> = ({ data, title }) => {
  const columns: GridColDef[] = [
    {
      field: 'symbol',
      headerName: 'Symbol',
      flex: 1,
      renderCell: (params) => {
        const symbol = params.row.symbol;
        return (
          <a style={{ color: 'black' }} href={`#/quote?symbol=${symbol}`}>
            {symbol}
          </a>
        );
      }
    },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      flex: 1,
      valueFormatter: (params) => numberFormatter.format(params.value)
    },
    {
      field: 'changesPercentage',
      headerName: 'Changes Percentage',
      type: 'number',
      flex: 1,
      renderCell: (params) => {
        const isPositive = params.value > 0;
        return (
          <span style={{ color: isPositive ? 'green' : 'red' }}>
            {isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
            {percentageFormatter(params.value)}
          </span>
        );
      }
    }
  ];

  return (
    <div style={{ height: 635, width: '100%' }}>
      <Typography variant="h5" mt={2} sx={{ marginBottom: '20px', color: 'black' }}>
        {title}
      </Typography>
      <DataGrid
        rows={data}
        columns={columns}
        sx={{
          margin: '0px 40px'
        }}
        getRowId={getRowId}
        showColumnVerticalBorder
        showCellVerticalBorder
        checkboxSelection
      />
    </div>
  );
};

export default StockPriceChangeDataTable;
