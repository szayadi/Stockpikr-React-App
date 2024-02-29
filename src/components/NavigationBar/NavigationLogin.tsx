import React, { useEffect, useState } from 'react';
import '../../index.css';
import { UserApiService } from '../../services/UserApiService';
import NavigationAccount from './NavigationAccount';
import NavigationSignin from './NavigationSignin';

const NavigationLogin: React.FC = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const loggedIn = await UserApiService.isUserLoggedIn();
      console.log('isUserLoggedIn: ', loggedIn);
      setIsUserLoggedIn(loggedIn);
    };

    checkUserLoggedIn();
  }, []);

  return <>{isUserLoggedIn == true ? <NavigationAccount /> : <NavigationSignin />}</>;
};

export default NavigationLogin;
