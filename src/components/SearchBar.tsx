import { ClickAwayListener } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorResponse } from '../helper/errorResponse';
import IStockData from '../interfaces/IStockData';
import { StockApiService } from '../services/StockApiService';

const SearchBar: React.FC = () => {
  const [searchOptions, setSearchOptions] = useState<IStockData[]>([]);
  const [inputSearch, setInputSearch] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleOnChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputSearch(value);
    if (value.trim().length === 0) {
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      fetchData(value);
    }, 1000);
  };

  const handleClose = () => {
    setSearchOptions([]);
  };

  const filterOptions = (options: IStockData[], { inputValue }: { inputValue: string }) => {
    if (options.length === 0) {
      return options;
    }
    return options.filter(
      (stock) => stock.name.toLowerCase().includes(inputValue) || stock.symbol.toLowerCase().includes(inputValue)
    );
  };

  const handleOnChangeAutoComplete = (e: React.SyntheticEvent<Element, Event>, value: IStockData | null) => {
    if (!value) {
      return;
    }
    navigate('/quote?symbol=' + value.symbol);
    window.location.reload();
  };

  const fetchData = async (value: string): Promise<void> => {
    StockApiService.fetchStockSearch(value).then((response): void => {
      if (response == null || getErrorResponse(response)) {
        return;
      }
      setSearchOptions(response);
    });
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // api does not accept stock name for quotes, so we force the user to select from the drop down
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <ClickAwayListener onClickAway={handleClose}>
        <Autocomplete
          options={searchOptions}
          onChange={handleOnChangeAutoComplete}
          getOptionLabel={(option) => option.symbol}
          filterOptions={filterOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              onKeyDown={handleEnterPress}
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
                fontSize: '15px',
                alignItems: 'center'
              }}
            >
              <strong style={{ width: '150px', textAlign: 'left' }}>{option.symbol}</strong>
              <span style={{ flex: 1, marginLeft: '10px', marginRight: '10px' }}>{option.name}</span>
              <em style={{ width: '150px', textAlign: 'right' }}>{option.exchangeShortName}</em>
            </li>
          )}
          sx={{
            backgroundColor: 'white',
            width: '700px',
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
