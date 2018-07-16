import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import {
  RadioButton,
  Avatar,
  Divider,
  ListItem,
  Subheader,
  Toolbar,
  ActionButton,
  Card,
  IconToggle,
  Badge,
  Icon,
  BottomNavigation,
  BottomNavigationAction
} from 'react-native-material-ui';

import { configureStore } from './src/store.js';
import { bindAppActions, appReduxActions } from './src/reducers/appReducer.js';

const store = configureStore();

bindAppActions(store.dispatch);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'today',
      navIndex: 0
    }
  }

  componentWillMount() {
    appReduxActions.appStarted();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
            <View style={{flex: 1}}>
            </View>
            <BottomNavigation active={this.state.active} hidden={false} style={{flex: 1}}>
              <BottomNavigation.Action
                key="today"
                icon="assignment"
                label="Today"
                onPress={() => this.setState({ active: 'today' })}
              />
              <BottomNavigation.Action
                key="subjects"
                icon="book"
                label="Subjects"
                onPress={() => this.setState({ active: 'subjects' })}
              />
              <BottomNavigation.Action
                key="teachers"
                icon="school"
                label="Teachers"
                onPress={() => this.setState({ active: 'teachers' })}
              />
              <BottomNavigation.Action
                key="settings"
                icon="settings"
                label="Settings"
                onPress={() => this.setState({ active: 'settings' })}
              />
            </BottomNavigation>
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
