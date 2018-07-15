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
      active: false,
      navIndex: 0
    }
  }

  componentWillMount() {
    appReduxActions.appStarted();
  }

  render() {
    return (
      <Provider store={store}>
          {/*<Toolbar*/}
            {/*leftElement="menu"*/}
            {/*centerElement="Searchable"*/}
            {/*searchable={{*/}
              {/*autoFocus: true,*/}
              {/*placeholder: 'Search',*/}
            {/*}}*/}
            {/*rightElement={{*/}
              {/*menu: {*/}
                {/*icon: "more-vert",*/}
                {/*labels: ["item 1", "item 2"]*/}
              {/*}*/}
            {/*}}*/}
            {/*onRightElementPress={ (label) => { console.log(label) }}*/}
          {/*/>*/}
          {/*<ActionButton /> // default with icon (default icon is +)*/}
          {/*<ActionButton icon="done" /> // with done icon*/}
          {/*<Text>Here is our Daybook App!</Text>*/}
          {/*<RadioButton*/}
            {/*label="Unchecked"*/}
            {/*checked={false}*/}
            {/*value="Value"*/}
            {/*onCheck={(checked) => this.setState({ checked })}*/}
          {/*/>*/}
          {/*<Divider/>*/}
          {/*<Avatar icon="person" iconColor="blue" />*/}
          {/*<Divider/>*/}
          {/*<ListItem*/}
            {/*divider*/}
            {/*centerElement={{*/}
              {/*primaryText: 'Primary text',*/}
            {/*}}*/}
            {/*onPress={() => {}}*/}
          {/*/>*/}
          {/*<Subheader text="Subheader text" />*/}

        <BottomNavigation active={this.state.active} hidden={false}>
          <BottomNavigation.Action
            key="today"
            icon="today"
            label="Today"
            onPress={() => this.setState({ active: 'today' })}
          />
          <BottomNavigation.Action
            key="people"
            icon="people"
            label="People"
            onPress={() => this.setState({ active: 'people' })}
          />
          <BottomNavigation.Action
            key="bookmark-border"
            icon="bookmark-border"
            label="Bookmark"
            onPress={() => this.setState({ active: 'bookmark-border' })}
          />
          <BottomNavigation.Action
            key="settings"
            icon="settings"
            label="Settings"
            onPress={() => this.setState({ active: 'settings' })}
          />
        </BottomNavigation>
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
