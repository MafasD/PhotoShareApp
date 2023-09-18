import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
 
const HomeScreen = () => {
  const navigation = useNavigation(); //Initializing the navigation object

  //Function for navigating to Dashboard screen
  const goToDashboard = () => {
    navigation.navigate('Dashboard');
  };
  return (
    <View> 
      <Text>Welcome to the Home Screen</Text>
      <Button title="Go to Dashboard" onPress={goToDashboard} />
    </View>
  );
};

export default HomeScreen;
