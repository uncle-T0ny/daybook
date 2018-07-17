import React, {Component} from 'react';
import {StyleSheet, View, Text,} from 'react-native';

export default class Settings extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    fontSize: 25
  }
})