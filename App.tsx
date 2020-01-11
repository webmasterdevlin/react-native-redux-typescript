import React from 'react';
import RootNavigation from './app/navigation/root-navigation';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import store from './app/store';

declare var global: {HermesInternal: null | {}};

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <RootNavigation />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
