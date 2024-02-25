import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as React from 'react';
import { numberFormatter, percentageFormatter } from '../../helper/numberFormatter';
import { IStockQuote } from '../../interfaces/IStockQuote';

export interface DataTableProps {
  data: IStockQuote[];
}

const getRowId = (row: IStockQuote) => row.symbol;

const StockQuoteDataTable: React.FC<DataTableProps> = ({ data }) => {
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
        const isPositive = params.value >= 0;
        return (
          <span style={{ color: isPositive ? 'green' : 'red' }}>
            {isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
            {percentageFormatter(params.value)}
          </span>
        );
      }
    },
    {
      field: 'change',
      headerName: 'Change',
      type: 'number',
      flex: 1,
      renderCell: (params) => {
        const isPositive = params.value >= 0;
        return (
          <span style={{ color: isPositive ? 'green' : 'red' }}>
            {isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
            {numberFormatter.format(params.value)}
          </span>
        );
      }
    },
    {
      field: 'dayLow',
      headerName: 'Day Low',
      type: 'number',
      flex: 1,
      valueFormatter: (params) => numberFormatter.format(params.value)
    },
    {
      field: 'dayHigh',
      headerName: 'Day High',
      type: 'number',
      flex: 1,
      valueFormatter: (params) => numberFormatter.format(params.value)
    },
    {
      field: 'yearHigh',
      headerName: 'Year High',
      type: 'number',
      flex: 1,
      valueFormatter: (params) => numberFormatter.format(params.value)
    },
    {
      field: 'yearLow',
      headerName: 'Year Low',
      type: 'number',
      flex: 1,
      valueFormatter: (params) => numberFormatter.format(params.value)
    },
    {
      field: 'marketCap',
      headerName: 'Market Cap',
      type: 'number',
      flex: 1,
      valueFormatter: (params) => numberFormatter.format(params.value)
    },
    { field: 'exchange', headerName: 'Exchange', flex: 1 },
    {
      field: 'volume',
      headerName: 'Volume',
      type: 'number',
      flex: 1,
      valueFormatter: (params) => numberFormatter.format(params.value)
    },
    {
      field: 'avgVolume',
      headerName: 'Average Volume',
      type: 'number',
      flex: 1,
      valueFormatter: (params) => numberFormatter.format(params.value)
    },
    {
      field: 'open',
      headerName: 'Open',
      type: 'number',
      flex: 1,
      valueFormatter: (params) => numberFormatter.format(params.value)
    },
    {
      field: 'previousClose',
      headerName: 'Previous Close',
      type: 'number',
      flex: 1,
      valueFormatter: (params) => numberFormatter.format(params.value)
    }
  ];

  return (
    <div style={{ height: 1000, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        sx={{
          margin: '0px 40px'
        }}
        getRowId={getRowId}
        checkboxSelection
        showColumnVerticalBorder
        showCellVerticalBorder
      />
    </div>
  );
};

export default StockQuoteDataTable;
