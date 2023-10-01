import { useEffect } from 'react';
import userAuthState from './userAuthState';
import { useNavigation } from '@react-navigation/native';

const AuthCheck = () => {
  const user = userAuthState(); //Taking the auth status of user from userAuthState
  const navigation = useNavigation(); //Initializing the navigation object

  //Trying this method to see if it fixes the warning
  useEffect(() => {
    //Checking if user is authenticated and navigating to homescreen if true
    if (user) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('AuthNavigator'); //If user is not authenticated, navigates to AuthNavigator, which then navigates user to the login screen.
    }
  }, [user]);

/* //Keeping this method just in case
  //Checking if user is authenticated and navigating to homescreen if true
  if (user) {
    navigation.navigate('Home');
  }  else {
    navigation.navigate('AuthNavigator'); //If user is not authenticated, navigates to AuthNavigator, which then navigates user to the login screen.
  }
*/
  return null  
};

export default AuthCheck;
