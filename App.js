import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
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

import Daybook from './src/components/Daybook';
import Subjects from './src/components/Subjects';
import Teachers from './src/components/Teachers';
import Settings from './src/components/Settings';
import { configureStore } from './src/store.js';
import { bindAppActions, appReduxActions } from './src/reducers/appReducer.js';

const store = configureStore();

bindAppActions(store.dispatch);

const screens = {
  daybook: 'daybook',
  subjects: 'subjects',
  teachers: 'teachers',
  settings: 'settings'
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: screens.daybook,
      navIndex: 0
    }
  }

  componentWillMount() {
    appReduxActions.appStarted();
  }

  getScreenComponent(){
    switch(this.state.active){
      case screens.daybook :
        return <Daybook/>
      case screens.subjects :
        return <Subjects/>
      case screens.teachers :
        return <Teachers/>
      case screens.settings :
        return <Settings/>
      default:
        return <Daybook/>
    }

  }

  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.basicFlex}>
            <View style={styles.basicFlex}>
              {this.getScreenComponent()}
            </View>
            <BottomNavigation active={this.state.active} hidden={false}>
              <BottomNavigation.Action
                key={screens.daybook}
                icon="assignment"
                label="Daybook"
                onPress={() => this.setState({ active: screens.daybook })}
              />
              <BottomNavigation.Action
                key={screens.subjects}
                icon="book"
                label="Subjects"
                onPress={() => this.setState({ active: screens.subjects })}
              />
              <BottomNavigation.Action
                key={screens.teachers}
                icon="school"
                label="Teachers"
                onPress={() => this.setState({ active: screens.teachers })}
              />
              <BottomNavigation.Action
                key={screens.settings}
                icon="settings"
                label="Settings"
                onPress={() => this.setState({ active: screens.settings })}
              />
            </BottomNavigation>
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  basicFlex: {
    flex: 1,
  },
});
