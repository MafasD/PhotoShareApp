//This file listens to changes in the authentication state (logged in/out) and updates the user state accordingly
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

const userAuthState = () => {
  //Initializing a state variable 'user' with the initial value of null (logged out)
  const [user, setUser] = useState(null);

  //Subscribing to authentication state changes (login/logout)
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      //When the authentication state changes, this callback function is executed
      if (authUser) {
        setUser(authUser); //If a user is authenticated (not null/logged in), the user state will be updated with the authenticated user.
      } else {
        setUser(null); //And if no user is logged in, user state will be set to null
      }
    });

    //Unsubscribing from the auth state changes to avoid memory leaks and other issues
    return () => {
      unsubscribe();
    };
  }, []);

  return user;
};

export default userAuthState;
