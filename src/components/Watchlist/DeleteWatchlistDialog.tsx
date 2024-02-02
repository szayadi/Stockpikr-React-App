import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { WatchlistApiService } from '../../services/WatchlistApiService';

// Define the prop types for the component
interface IDeleteWatchListDialog {
  watchlistName: string;
  isDeleteWatchlistDialog: boolean;
  handleCloseDeleteWatchlistDialog: (watchlistName?: string) => void;
}

const DeleteWatchListDialog: React.FC<IDeleteWatchListDialog> = ({
  watchlistName,
  isDeleteWatchlistDialog,
  handleCloseDeleteWatchlistDialog
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const onCancelRemoveWatchlist = () => {
    handleCloseDeleteWatchlistDialog();
  };

  const onConfirmDeleteWatchlist = async () => {
    console.log({ watchlistName });
    const result = await WatchlistApiService.deleteWatchlist(watchlistName);
    if (result && result.acknowledged && result.deletedCount === 1) {
      alert('Delete the watchlist successfully');
      handleCloseDeleteWatchlistDialog(watchlistName);
    } else {
      handleCloseDeleteWatchlistDialog();
    }
  };

  return (
    <Dialog open={isDeleteWatchlistDialog} onClose={() => handleCloseDeleteWatchlistDialog()} fullScreen={fullScreen}>
      <DialogTitle>{`Delete watchlist '${watchlistName}'`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this watchlist? Once deleted, it won't be recoverable.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelRemoveWatchlist}>Cancel</Button>
        <Button onClick={onConfirmDeleteWatchlist}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteWatchListDialog;
