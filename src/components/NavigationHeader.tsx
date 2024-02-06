import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/images/logo+title-light-mode.png';
import '../index.css';
import SearchBar from './SearchBar';

const pages = [
  { title: 'Dashboard', key: 'dashboard' },
  { title: 'Watchlist', key: 'watchlist' },
  { title: 'My Positions', key: 'positions' }
];
const settings = [
  { title: 'Settings', key: 'settings' },
  { title: 'Logout', key: 'logout' }
];

function NavigationHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogIn = () => {
    setIsLoggedIn(true)
  }

  const handleLogOut = () => {
    setIsLoggedIn(false)
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'var(--navbar-bg-color)', fontFamily: 'Raleway' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={LogoImage} alt="Logo" style={{ height: '60px', marginRight: '10px', borderRadius: '10px' }} />
          </Link>

          <SearchBar></SearchBar>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            ></IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.key} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                  <Link style={{ textAlign: 'center' }} to={page.key}>
                    {page.title}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Box key={page.key} sx={{ my: 2, marginLeft: 2, marginRight: 2 }}>
                <Link style={{ color: 'white', textDecoration: 'none' }} to={page.key}>
                  {page.title}
                </Link>
              </Box>
            ))}
          </Box>

          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((s) => (
                  (s.key === 'logout') ? (
                    <MenuItem key={s.key} onClick={handleLogOut} style={{ textDecoration: 'none', fontFamily: 'Raleway', fontWeight: 500 }}>
                      {s.title}
                    </MenuItem>
                  ) : (
                    <MenuItem key={s.key} onClick={handleCloseUserMenu}>
                      <Link style={{ textAlign: 'center', color: 'black', textDecoration: 'none', fontFamily: 'Raleway', fontWeight: 500 }} to={s.key}>
                        {s.title}
                      </Link>
                    </MenuItem>
                  )
                ))}
              </Menu>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogIn}
              style={{
                backgroundColor: 'var(--navbar-bg-color)',
                textDecoration: 'none',
                borderRadius: '20px',
                padding: '10px 20px',
                fontWeight: 'bold',
                fontFamily: 'inherit',
                border: '2px white solid'
              }}
              component={Link}
              to="/signin"
            >
              Sign In
            </Button>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationHeader;
