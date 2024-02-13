import '../../index.css';
import NavigationSignin from './NavigationSignin';
import NavigationAccount from './NavigationAccount';

function NavigationLogin() {
  return (
    <>
      {localStorage.getItem("isLoggedIn") == "true" ? (
        <NavigationAccount/>
      ): (
        <NavigationSignin/>
      )}
    </>
  );
}
export default NavigationLogin;
