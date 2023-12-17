import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem } from '@mui/base/MenuItem';

interface WatchlistDropDownProps {
  listKey: string[];
  setListKey: (key: string) => void;
}

const WatchlistDropDown: React.FC<WatchlistDropDownProps> = ({ listKey, setListKey }) => {
  function onClickKey(key: string) {
    setListKey(key);
  }

  function onClickAddNewWatchlist() {
    console.log('Add new watchlist');
  }

  return (
    <Dropdown>
      <MenuButton>My Watchlist</MenuButton>
      <Menu>
        {listKey.map((key) => (
          <MenuItem onClick={() => onClickKey(key)}>{key}</MenuItem>
        ))}
        <MenuItem onClick={() => onClickAddNewWatchlist()}>Add new Watchlist</MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default WatchlistDropDown;
