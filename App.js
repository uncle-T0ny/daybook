import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from './src/store.js';
import { bindAppActions, appReduxActions } from './src/reducers/appReducer.js';
import MainComponent from './src/components/MainComponent';

const store = configureStore();

bindAppActions(store.dispatch);

export default class App extends React.Component {

  componentWillMount() {
    appReduxActions.appStarted();
  }

  render() {
    return (
      <Provider store={store}>
        <MainComponent/>
      </Provider>
    );
  }
}
