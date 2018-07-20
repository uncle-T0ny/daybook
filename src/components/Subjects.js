import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { strings } from '../functions/i18n';

export default class Subjects extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>{strings('Subjects.title')}</Text>
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
