import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TimePickerAndroid,
  Text,
  TouchableOpacity,
  DatePickerAndroid,
  StyleSheet,
  ViewPropTypes
} from 'react-native';
import {strings} from "../../functions/i18n";
import getColorForItems from "../../functions/getColorForItems";
import { addZero } from "../../functions/formatFunctions";


export default class AndroidDateTimePicker extends Component {
  constructor(props){
    super();
    const currDate = new Date(props.date);
    this.state = {date: currDate, hour: currDate.getHours(), minute: currDate.getMinutes()};
  }

  static propTypes = {
    date: PropTypes.number,
    onDateSelect: PropTypes.func,
    hours: PropTypes.number,
    minutes: PropTypes.number,
    style: ViewPropTypes.style
  };

  onDateOrTimeChanged = () => {
    const dateVal = new Date(this.state.date);
    dateVal.setHours(this.state.hour);
    dateVal.setMinutes(this.state.minute);
    this.props.onDateSelect(dateVal);
  }

  callAndroidTimePicker = async (stateKey, options) => {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: this.props.hours,
        minute: this.props.minutes,
        is24Hour: false,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        this.setState(
          { hour, minute },
          this.onDateOrTimeChanged
          );
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }


  getNativeTimePicker = () => {
    return (
      <View  style={[styles.inputContainer, {borderColor: getColorForItems(this.state.hour + this.state.minute)}]}>
        <TouchableOpacity
          onPress={this.callAndroidTimePicker}
        >
          <View style={styles.inputTitleWrap}>
            <Text style={styles.inputTitle}>{strings('Daybook.time')}</Text>
          </View>
          <Text style={styles.inputContent}>{addZero(this.state.hour)}:{addZero(this.state.minute)}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  callAndroidDatePicker = async () => {
    try {
      const {action, year, month, day} = await
        DatePickerAndroid.open({
          date: this.state.date || new Date()
        });
      if (action !== DatePickerAndroid.dismissedAction) {
        var date = new Date(year, month, day);
        this.setState(
          { date },
          this.onDateOrTimeChanged
        );
        this.props.onDateSelect(date);
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  getNativeDatePicker = () => {
    const constDate = this.state.date;
    return (
      <View style={[styles.inputContainer, {borderBottomColor:  getColorForItems(constDate.getDate())}]}>
        <TouchableOpacity
          onPress={this.callAndroidDatePicker}
        >
          <View style={styles.inputTitleWrap}>
            <Text  style={styles.inputTitle}>{strings('Daybook.date')}</Text>
          </View>
            <Text style={styles.inputContent}>
              {addZero(constDate.getDate())}.{addZero(constDate.getMonth()+1)}.{constDate.getFullYear()}
            </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render(){
    return(
      <View style={this.props.style}>
        {this.getNativeDatePicker()}
        {this.getNativeTimePicker()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    width: '66%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    borderBottomWidth: 1,
    marginTop: 10
  },
  inputTitleWrap: {
    alignItems: 'center',
    marginBottom: 5
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'center'

  },
  inputContent: {
    flex: 1,
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  },
});
