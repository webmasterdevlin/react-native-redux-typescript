/**
 * @format
 */

import {AppRegistry} from 'react-native';
import NavigationWrapper from './app/navigation/navigation-wrapper'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => NavigationWrapper);
