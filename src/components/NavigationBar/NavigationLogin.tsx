import '../../index.css';
import NavigationAccount from './NavigationAccount';
import NavigationSignin from './NavigationSignin';

function NavigationLogin() {
  return (
    <>
      {localStorage.getItem('isLoggedIn') == 'true' || process.env.REACT_APP_NODE_ENV !== 'production' ? (
        <NavigationAccount />
      ) : (
        <NavigationSignin />
      )}
    </>
  );
}
export default NavigationLogin;
