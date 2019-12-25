import React from 'react';
import RootNavigation from './root-navigation';
import {Provider} from 'react-redux';
import store from '../store';

const NavigationWrapper: React.FC<void> = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};
export default NavigationWrapper;
