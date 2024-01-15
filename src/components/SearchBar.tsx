import { ClickAwayListener } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useRef, useState } from 'react';
import IStockData from '../interfaces/IStockData';
import { StockApiService } from '../services/StockApiService';

const SearchBar: React.FC = () => {
  const [searchOptions, setSearchOptions] = useState<IStockData[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOnChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim().length === 0) {
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      fetchData(value);
    }, 1500);
  };

  const handleClose = () => {
    setSearchOptions([]);
  };

  const handleOnChangeAutoComplete = (e: React.SyntheticEvent<Element, Event>, value: IStockData | null) => {
    // When an Item is clicked, redirect to stock details page.
    console.log('item clicked', value);
  };

  const fetchData = async (value: string): Promise<void> => {
    StockApiService.fetchCompanySearch(value).then((response) => {
      if (response == null) {
        return;
      }
      setSearchOptions(response);
    });
  };

  return (
    <div style={{ margin: '20px' }}>
      <ClickAwayListener onClickAway={handleClose}>
        <Autocomplete
          options={searchOptions}
          onChange={handleOnChangeAutoComplete}
          getOptionLabel={(option) => option.symbol}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search by symbol or name"
              style={{ marginRight: '10px' }}
              onChange={handleOnChangeTextField}
            />
          )}
          renderOption={(props, option) => (
            <li
              {...props}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '15px',
                whiteSpace: 'nowrap',
                alignItems: 'center'
              }}
            >
              <strong>{option.symbol}</strong>&nbsp;&nbsp;&nbsp;
              {option.name}&nbsp;&nbsp;&nbsp;
              <em>{option.exchangeShortName}</em>
            </li>
          )}
          sx={{
            backgroundColor: 'white',
            width: '500px',
            borderRadius: 3,
            '& li': {
              width: 'auto'
            }
          }}
        />
      </ClickAwayListener>
    </div>
  );
};

export default SearchBar;
