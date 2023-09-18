import { AppRegistry } from 'react-native';
import App from './app';
import { name as appName } from './app.json';

//Registering app's main component
AppRegistry.registerComponent(appName, () => App);