/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Set up the base URL for your API requests
const BASE_URL = 'http://localhost:5000';

// OR Set up axios
import axios from 'axios';
axios.defaults.baseURL = BASE_URL;

AppRegistry.registerComponent(appName, () => App);
