import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import React from 'react';

interface PortfolioProps {
  data: Array<{ [key: string]: any }>;
  columns: string[];
}

const Portfolio: React.FC<PortfolioProps> = ({ data, columns }) => {
  return (
    <Box mt={4}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.symbol}>
                {columns.map((column) => (
                  <TableCell key={column}>{row[column.toLowerCase()]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Portfolio;
