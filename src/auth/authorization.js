//This is the file with authentication methods (register, login and logout functions)
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const Authorization = ({ isRegistration }) => {
  //Initializing state variables for managing email, password and username input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [registrationError, setRegistrationError] = useState(null);


  //Register function
  const register = async () => {
    try {
      if (!email || !password || !username) {
        setRegistrationError('All fields are required!');
        return;
      }
      const response = await auth().createUserWithEmailAndPassword(email, password);
      const user = response.user;
      await user.updateProfile({
        displayName: username,
      });
      console.log('User registered successfully!', user);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  
  //Login function
  const login = async () => {
    try {
      if (!email || !password) {
        setLoginError('All fields are required!');
        return;
      }
      await auth().signInWithEmailAndPassword(email, password);
      console.log('User logged in successfully!');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  //When user is on login screen, isRegistration is false and login function will be displayed/run. When user is on register screen, isRegistration is true and register function will be displayed/run.
  return (
    <View>
      {loginError && <Text style={styles.errorText}>{loginError}</Text>}
      {registrationError && <Text style={styles.errorText}>{registrationError}</Text>}
      <Text style={{ display: 'none' }}>{isRegistration ? 'Registration' : 'Login'}</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password" 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {isRegistration && (
        <TextInput 
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      )}
      <Button style={{ display: 'none' }} title={isRegistration ? "Register" : "Login"} onPress={isRegistration ? register : login} />
    </View>
  );
};
//CSS for error messages
const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 5,
  },
});


//Logout function
export async function logout() {
  try {
    await auth().signOut();
    console.log('User logged out successfully!');
  } catch (error) {
    console.error('Logout error:', error);
  }
}


export default Authorization;
