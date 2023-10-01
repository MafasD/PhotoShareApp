import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PostPhotoScreen from '../screens/PostPhotoScreen';
import MyPosts from '../screens/MyPosts';
import EditPost from '../screens/EditPost';
import AuthCheck from '../auth/authCheck';
import { logout } from '../auth/authorization';
import { Button } from 'react-native';
import AuthNavigator from './AuthNavigator'; // Import the AuthNavigator

const Stack = createStackNavigator();

//Custom header component with logout button
const CustomHeader = () => {
  const navigation = useNavigation();

  //Logout function
  const handleLogout = async () => {
    await logout(); //Calling the logout function from authorization.js
    //This will navigate user back to the login screen after logout
    navigation.navigate('AuthCheck');
  };

  return (
    <>
      <Button title="Logout" onPress={handleLogout} />
    </>
  );
};

//The main navigator that manages navigation between the screens after a user is authenticated(logged in).
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="AuthCheck">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Home', //This adds the title to the top of the screen
          headerLeft: null, //This line hides the "return" button from header, since it's not needed
          headerRight: () => <CustomHeader />, //This adds the logout button to header
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerTitle: 'Dashboard',
          //headerLeft: null,
          headerRight: () => <CustomHeader />,
        }}
      />
      <Stack.Screen 
      name="CreatePost" 
      component={PostPhotoScreen} 
      options={{ 
        headerTitle: 'Create Post',
        //headerLeft: null,
        headerRight: () => <CustomHeader />,
        }} />
        <Stack.Screen
        name="MyPosts"
        component={MyPosts}
        options={{
          headerTitle: 'My Posts',
          //headerLeft: null,
          headerRight: () => <CustomHeader />,
        }}
      />
        <Stack.Screen
        name="EditPost"
        component={EditPost}
        options={{
          headerTitle: 'Edit Posts',
          //headerLeft: null,
          headerRight: () => <CustomHeader />,
        }}
      />
      <Stack.Screen 
      name="AuthCheck" 
      component={AuthCheck} 
      options={{ 
        headerShown: false 
        }} 
      /> 
      <Stack.Screen 
      name="AuthNavigator" 
      component={AuthNavigator} 
      options={{ 
        headerShown: false 
        }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
