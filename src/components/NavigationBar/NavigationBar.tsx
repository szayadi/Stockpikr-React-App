import { AppBar, Container, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoImage from '../../assets/images/logo-title-light-mode.png';
import SearchBar from '../SearchBar';
import NavigationLogin from './NavigationLogin';

import '../../index.css';

function NavigationHeader() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'var(--navbar-bg-color)', fontFamily: 'Raleway' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={LogoImage} alt="Logo" style={{ height: '50px', marginRight: '10px', borderRadius: '10px' }} />
          </Link>

          <SearchBar></SearchBar>

          <NavigationLogin />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationHeader;
