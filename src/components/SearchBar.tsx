import { ClickAwayListener } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorResponse } from '../helper/errorResponse';
import { IStockQuote } from '../interfaces/IStockQuote';
import { StockApiService } from '../services/StockApiService';
import { useAsyncError } from './GlobalErrorBoundary';

const SearchBar: React.FC = () => {
  const [searchOptions, setSearchOptions] = useState<IStockQuote[]>([]);
  const [inputSearch, setInputSearch] = useState<string>('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const throwError = useAsyncError();

  const handleOnChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputSearch(value);
    if (value.trim().length === 0) {
      return;
    }

    // debounce
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      fetchData(value);
    }, 600);
  };

  const handleClose = () => {
    setSearchOptions([]);
  };

  const filterOptions = (options: IStockQuote[], { inputValue }: { inputValue: string }) => {
    if (options.length === 0) {
      return options;
    }
    const inputLower = inputValue.toLowerCase();
    const filterOptions = options.filter(
      (stock) => stock.name.toLowerCase().includes(inputLower) || stock.symbol.toLowerCase().includes(inputLower)
    );
    return filterOptions;
  };

  const handleOnChangeAutoComplete = (e: React.SyntheticEvent<Element, Event>, value: IStockQuote | null) => {
    if (!value) {
      return;
    }
    navigate('/quote?symbol=' + value.symbol);
  };

  const fetchData = async (value: string): Promise<void> => {
    StockApiService.fetchDetailedStockSearch(value)
      .then((response): void => {
        if (!response || getErrorResponse(response)) {
          return;
        }
        setSearchOptions(response);
      })
      .catch((error) => {
        throwError(error);
      });
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchOptions.find((options) => options.symbol.toLocaleLowerCase() === inputSearch.toLocaleLowerCase())) {
        navigate('/quote?symbol=' + inputSearch);
      } else {
        event.preventDefault(); // api does not accept stock name for quotes, so we force the user to select from the drop down if it does not match
      }
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
              <em style={{ width: '150px', textAlign: 'right' }}>{option.exchange}</em>
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
