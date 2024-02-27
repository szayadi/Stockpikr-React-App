import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as React from 'react';
import { numberFormatter, percentageFormatter } from '../../helper/numberFormatter';
import { IStockPriceChange } from '../../interfaces/IStockPriceChange';
import ExportToExcelButton from '../ExportToExcel';

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
    <Box sx={{ height: 650, width: '100%' }}>
      <Grid container direction="column" style={{ height: '100%' }}>
        <Grid item>
          <Grid container justifyContent="center" alignItems="center" style={{ height: '10%' }}>
            <Grid item>
              <Typography variant="h5" sx={{ marginBottom: '20px', color: 'black' }}>
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <ExportToExcelButton data={data} title={title} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ height: '90%', width: '100%' }}>
          <div style={{ width: '100%', maxWidth: '100%', height: '100%' }}>
            <DataGrid
              rows={data}
              columns={columns}
              getRowId={getRowId}
              showColumnVerticalBorder
              showCellVerticalBorder
              checkboxSelection
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StockPriceChangeDataTable;
