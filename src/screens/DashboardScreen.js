import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation(); //Initializing the navigation object

  //Function for navigating to Home screen
  const goToHome = () => {
    navigation.navigate('Home');
  };
  
  return (
    <View>
      <Text>Welcome to the Dashboard Screen</Text>
      <Button title="Go to Home" onPress={goToHome} />
    </View>
  );
};

export default DashboardScreen;
