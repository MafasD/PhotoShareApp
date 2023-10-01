import React, { useEffect } from 'react';
import { View, Text, Button, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuthState from '../auth/userAuthState';
import NaviButtonStyles from '../styles/NaviButton';
import TextStyles from '../styles/TextStyle';
 
const HomeScreen = () => {
  const navigation = useNavigation(); 
  const user = useAuthState(); 

  //Function for navigating to Dashboard screen
  const goToDashboard = () => {
    navigation.navigate('Dashboard');
  };
  //Function for navigating to CreatePost screen
  const goToShare = () => {
    navigation.navigate('CreatePost');
  };
  //Function for navigating to MyPosts screen
  const goToMyPosts = () => {
    navigation.navigate('MyPosts');
  };

  //This alters the "back" button of the device. 
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        //If the user is authenticated, clicking "back" button will navigate to Home. This is to prevent the user from going back to the login screen while logged in, which would cause further issues.
        //I also don't want to disable the "back" button completely, since it still comes in handy for navigating.
        if (user) {
          navigation.navigate('Home');
          return true;
        }
        return false; //If the user is not authenticated and has somehow made it to the Home screen, they can use the "back" button, which should move them back to the login screen.
      }
    );
    return () => backHandler.remove();
  }, [user, navigation]);

/*
//This disables the "back" button of the device
useEffect(() => {
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    () => {
      return true;
    }
  );

  return () => backHandler.remove();
}, []);
*/

  return (
    <View style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <Text style={TextStyles.Text}>This is the Home Screen of the PhotoShare app.</Text>
      <Text></Text>
      <Text style={TextStyles.Text}>To add a new post, click "Create post".</Text>
      <Text></Text>
      <Text style={TextStyles.Text}>To look at posts created by users, click "Dashboard".</Text>
      <Text></Text>
      <Text style={TextStyles.Text}>To see your own posts, click "My posts".</Text>
      </View>
      <View style={NaviButtonStyles.buttonContainer}>
      <Button title="Dashboard" onPress={goToDashboard} />
      <Button title="Create Post" onPress={goToShare} />
      <Button title="My Posts" onPress={goToMyPosts} />
      </View>
    </View>
  );
};

export default HomeScreen;
