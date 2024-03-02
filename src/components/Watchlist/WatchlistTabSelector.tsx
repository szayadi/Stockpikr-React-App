import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, ButtonGroup } from '@mui/material';
import { useState } from 'react';
import { serializeError } from 'serialize-error';
import { userID } from '../../helper/constants';
import { Watchlists } from '../../interfaces/IWatchlistModel';
import { WatchlistApiService } from '../../services/WatchlistApiService';
import AutocompleteComponent from './Autocomplete';
import DeleteWatchListDialog from './DeleteWatchlistDialog';

interface WatchlistTabSelectorProps {
  showDeleteIcon: boolean;
  watchLists: Watchlists;
  setWatchLists: (wl: Watchlists) => void;
  selectedWatchList: string;
  setSelectedWatchList: (wl: string) => void;
}

export const WatchlistTabSelector = (props: WatchlistTabSelectorProps) => {
  const [wlKeys, setWlKeys] = useState<string[]>([]);
  const [isDeleteWatchlistDialog, setDeleteWatchlistDialog] = useState(false);

  const refreshWatchlist = (watchlists: Watchlists) => {
    props.setWatchLists(watchlists);
    setWlKeys(Object.keys(watchlists));
  };

  // may need later
  //   const isTickerInGivenWatchlist = (givenWatchlist: string) => {
  //     return (
  //       !!symbolParam &&
  //       !watchlists.some(
  //         (watchlist) =>
  //           watchlist.watchlistName === givenWatchlist &&
  //           watchlist.tickers.some((ticker) => ticker.symbol === symbolParam)
  //       )
  //     );
  //   };

  const handleCreateNewWatchlist = async (value: string) => {
    if (value && props.watchLists) {
      try {
        const name = await WatchlistApiService.createWatchlist({
          watchlistName: value,
          tickers: [],
          userID
        });
        if (!name) {
          throw Error('Watchlist Id is empty after creating');
        }
        props.watchLists[value] = [];
        refreshWatchlist(props.watchLists);
        props.setSelectedWatchList(value);
      } catch (error) {
        throw JSON.stringify(serializeError(error));
      }
    }
  };

  const handleCloseDeleteWatchlistDialog = (name?: string) => {
    if (name && props.watchLists) {
      // re-render with deleted watchlist removed from our state so that we dont need to query watchlists again
      delete props.watchLists[name];
      refreshWatchlist(props.watchLists);
      props.setSelectedWatchList('');
    }
    setDeleteWatchlistDialog(false);
  };

  return (
    <>
      <Box display="flex" flexDirection="row">
        <AutocompleteComponent
          watchListKeys={wlKeys}
          watchListKey={props.selectedWatchList}
          handleAppendNewKey={handleCreateNewWatchlist}
          setWlKey={props.setSelectedWatchList}
        />
        <ButtonGroup variant="text" aria-label="text button group">
          {props.showDeleteIcon && (
            <Button disabled={wlKeys.length === 0}>
              {' '}
              <DeleteIcon onClick={() => setDeleteWatchlistDialog(true)} fontSize="medium" />
            </Button>
          )}
        </ButtonGroup>
      </Box>
      <DeleteWatchListDialog
        watchListName={props.selectedWatchList}
        isDeleteWatchListDialog={isDeleteWatchlistDialog}
        handleCloseDeleteWatchListDialog={handleCloseDeleteWatchlistDialog}
      />
    </>
  );
};
