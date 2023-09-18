import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/navigation';
//import { name as appName } from './app.json';

const App = () => {
  return (
   <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;

//Registering app's main component
//AppRegistry.registerComponent(appName, () => App);
