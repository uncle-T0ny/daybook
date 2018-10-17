import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {strings} from "../../functions/i18n";
import getColorForItems from "../../functions/getColorForItems";
import PropTypes from 'prop-types';

export default class PickerWrapperIos extends Component {

  static propTypes = {
    title: PropTypes.string,
    currIndex: PropTypes.number,
    iosPickersVisibilityMode: PropTypes.number,
    showIosDatePicker: PropTypes.func,
    hidePicker: PropTypes.func,
    borderBottomColorVal: PropTypes.oneOfType([ PropTypes.string, PropTypes.number]),
    inputValPresentation: PropTypes.string,
    pickerComponent: PropTypes.element
  };

  render() {
    const {
      title,
      currIndex,
      iosPickersVisibilityMode,
      showIosDatePicker,
      hidePicker,
      borderBottomColorVal,
      inputValPresentation,
      pickerComponent
    } = this.props;
    return(
      <View>
        <View style={[styles.pickerPresentation,  {marginBottom: iosPickersVisibilityMode !== currIndex ? 25 : 0}]}>
          <TouchableOpacity
            style={styles.inputTitlePickerContainer}
            onPress={iosPickersVisibilityMode !== currIndex ? () => showIosDatePicker(currIndex) : hidePicker}
          >
            <Text style={styles.inputTitlePickerPresentation}>
              {title}
            </Text>
            <View style={{borderBottomWidth: 1, borderBottomColor: getColorForItems(borderBottomColorVal), marginBottom: 2}}>
              <Text style={styles.inputTitle}>
                {inputValPresentation}
              </Text>
            </View>
            {iosPickersVisibilityMode !== currIndex ?
              <Text style={styles.bottomInputTitle}>{strings('Daybook.tapToSelect')}</Text>
              :
              <Text style={styles.textClose}> {strings('Common.close')} </Text>
            }
          </TouchableOpacity>
        </View>
        {
          iosPickersVisibilityMode === currIndex &&
          <View style={styles.pickerItemStyle}>
            {pickerComponent}
          </View>
        }
      </View>
    );
  }
}

styles = StyleSheet.create({
  pickerPresentation: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  inputTitlePickerContainer: {
    flex: 1
  },
  inputTitlePickerPresentation: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center'
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginBottom: 1
  },
  bottomInputTitle: {
    position: 'absolute',
    color: 'grey',
    bottom: -13,
    fontSize: 12,
    alignSelf: 'center'
  },
  textClose: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
    alignSelf: 'center'
  },
  pickerItemStyle: {
    marginBottom: 15
  },
});
