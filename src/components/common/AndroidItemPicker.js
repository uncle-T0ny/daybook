import React, {Component} from 'react';
import {View, StyleSheet, Text, Picker, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import {strings} from "../../functions/i18n";
import getColorForItems from "../../functions/getColorForItems";

export default class AndroidItemPicker extends Component{

  static propTypes = {
    subject: PropTypes.oneOfType([ PropTypes.string, PropTypes.number]),
    onPickerValueChange: PropTypes.func,
    items: PropTypes.array
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.androidInputTitle}>
          {strings('Daybook.subject')}
        </Text>
        <Picker
          style={styles.pickerContainer}
          selectedValue={this.props.subject}
          onValueChange={this.props.onPickerValueChange}
        >
          {this.props.items}
        </Picker>
        <View style={[
          styles.underlineStyle,
          {borderTopColor: getColorForItems(Number(this.props.subject))}
        ]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  pickerContainer: {
    width: '100%'
  },
  androidInputTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginTop: 10
  },
  underlineStyle: {
    height: 0,
    width: '66%',
    borderTopWidth: 1.5
  }
});
