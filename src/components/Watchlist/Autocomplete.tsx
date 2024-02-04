import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';

// Define the prop types for the component
interface MyComponentProps {
  watchListKeys: string[];
  handleAppendNewKey: (key: string) => void;
  setWlKey: (key: string) => void;
}

const filter = createFilterOptions<WatchlistId>();

const AutocompleteComponent: React.FC<MyComponentProps> = ({ watchListKeys, handleAppendNewKey, setWlKey }) => {
  const [value, setValue] = React.useState<string | null>(null);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({ id: '', inputValue: '' });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState<WatchlistId>({
    id: '',
    inputValue: ''
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue(dialogValue.id.trim());
    handleAppendNewKey(dialogValue.id.trim());
    handleClose();
  };

  React.useEffect(() => {
    if (value && !watchListKeys.includes(value)) setValue('');
  }, [value, watchListKeys]);

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                id: newValue
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              id: newValue.inputValue
            });
          } else {
            if (newValue && newValue.id) {
              setValue(newValue.id);
              if (watchListKeys.includes(newValue.id)) setWlKey(newValue.id);
            } else {
              setValue('');
            }
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({ inputValue: params.inputValue, id: `Add "${params.inputValue}"` });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={watchListKeys.map((key) => ({ id: key, inputValue: '' } as WatchlistId))}
        getOptionLabel={(option) => {
          // e.g. value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.id;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.id}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label={watchListKeys.length > 0 ? watchListKeys[0] : ''} />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new Watchlist</DialogTitle>
          <DialogContent>
            <DialogContentText>Create a new watchlist to manage your favorite stocks!</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.id}
              onChange={(event) => setDialogValue({ ...dialogValue, id: event.target.value })}
              label="id"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

interface WatchlistId {
  id: string;
  inputValue?: string;
}

export default AutocompleteComponent;
