import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

//Basically a navigator that manages the navigation between Login and Registration screens.
const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerLeft: false }} />
      <Stack.Screen name="Registration" component={RegisterScreen} options={{ headerLeft: false }}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;