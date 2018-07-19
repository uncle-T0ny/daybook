import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';

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

import Daybook from './Daybook';
import Subjects from './Subjects';
import Teachers from './Teachers';
import Settings from './Settings';

const screens = {
  daybook: 'daybook',
  subjects: 'subjects',
  teachers: 'teachers',
  settings: 'settings'
}

export default class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: screens.daybook,
      navIndex: 0
    }
  }

  getScreenComponent(){
    switch (this.state.active) {
      case screens.daybook:
        return <Daybook/>
      case screens.subjects:
        return <Subjects/>
      case screens.teachers:
        return <Teachers/>
      case screens.settings:
        return <Settings/>
      default:
        return <Daybook/>
    }

  }
  render(){
    return(
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
    );
  }
}

const styles = StyleSheet.create({
  basicFlex: {
    flex: 1,
  },
});
