import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import { configureStore } from './src/store.js';
import { bindAppActions, appReduxActions } from './src/reducers/appReducer.js';

const store = configureStore();

bindAppActions(store.dispatch);

export default class App extends React.Component {
  componentWillMount() {
    appReduxActions.appStarted();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text>Here is our Daybook App!</Text>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
