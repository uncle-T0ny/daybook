import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationAction,
  COLOR,
  ThemeContext,
  getTheme,
} from 'react-native-material-ui';

import Daybook from './Daybook';
import Subjects from './Subjects';
import Teachers from './Teachers';
import Settings from './Settings';
import { strings } from '../functions/i18n';

const screens = {
  daybook: 'daybook',
  subjects: 'subjects',
  teachers: 'teachers',
  settings: 'settings'
};


const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  listItem: {
    container: {
      height: 6,
    },
  },
  subheader:{
    container: {
      backgroundColor: COLOR.grey300,
    },
  }
};

export default class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: screens.daybook,
      navIndex: 0
    }
  }

  getScreenComponent() {
    switch (this.state.active) {
      case screens.daybook:
        return <Daybook/>;
      case screens.subjects:
        return <Subjects/>;
      case screens.teachers:
        return <Teachers/>;
      case screens.settings:
        return <Settings/>;
      default:
        return <Daybook/>;
    }
  }

  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <SafeAreaView style={styles.basicFlex}>
          <View style={styles.basicFlex}>
            {this.getScreenComponent()}
          </View>
          <BottomNavigation active={this.state.active} hidden={false}
                            theme1={{icon: {color: 'yellow'}, iconActive: {color: 'red'}}}
          >
            <BottomNavigation.Action
              key={screens.daybook}
              icon="assignment"
              label={strings('Navigation.Daybook')}
              onPress={() => this.setState({ active: screens.daybook })}
              theme={{icon: {color: 'yellow'}, iconActive: {color: 'red'}}}
            />
            <BottomNavigation.Action
              key={screens.subjects}
              icon="book"
              label={strings('Navigation.Subjects')}
              onPress={() => this.setState({ active: screens.subjects })}
              theme={{icon: {color: 'yellow'}, iconActive: {color: 'red'}}}
            />
            <BottomNavigation.Action
              key={screens.teachers}
              icon="school"
              label={strings('Navigation.Teachers')}
              onPress={() => this.setState({ active: screens.teachers })}
              theme={{icon: {color: 'yellow'}, iconActive: {color: 'red'}}}
            />
            <BottomNavigation.Action
              key={screens.settings}
              icon="settings"
              label={strings('Navigation.Settings')}
              onPress={() => this.setState({ active: screens.settings })}
              theme={{icon: {color: 'yellow'}, iconActive: {color: 'red'}}}
            />
          </BottomNavigation>
        </SafeAreaView>
      </ThemeContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  basicFlex: {
    flex: 1,
  },
});
