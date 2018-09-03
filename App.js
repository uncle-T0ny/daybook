import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { configureStore } from './src/store.js';
import { bindAppActions, appReduxActions } from './src/reducers/appReducer.js';
import { bindSubjectActions } from './src/reducers/subjectsReducer';
import MainComponent from './src/components/MainComponent';

const store = configureStore();

bindAppActions(store.dispatch);
bindSubjectActions(store.dispatch);

export default class App extends React.Component {

  componentWillMount() {
    appReduxActions.appStarted();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <MainComponent/>
        </PersistGate>
      </Provider>
    );
  }
}
