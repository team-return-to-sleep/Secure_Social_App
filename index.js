/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Amplify from '@aws-amplify/core';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

AppRegistry.registerComponent('Secure_Social_App', () => App);

console.disableYellowBox = true;
