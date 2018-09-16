import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TimePickerAndroid,
  Platform,
  Text,
  TouchableOpacity,
  DatePickerIOS,
  DatePickerAndroid,
  StyleSheet
} from 'react-native';
import {strings} from "../../functions/i18n";

export default class AndroidDateTimePicker extends Component {
  constructor(props){
    super();
    const currDate = new Date(props.date);
    this.state = {date: currDate, hour: currDate.getHours(), minute: currDate.getMinutes()};
  }

  static propTypes = {
    date: PropTypes.number,
    onDateSelect: PropTypes.func
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
      <View  style={styles.inputContainer}>
        <Text style={styles.inputTitle}>{strings('Daybook.time')}</Text>
        <TouchableOpacity
          onPress={this.callAndroidTimePicker}
        >
          <Text style={styles.inputContent}>{this.state.hour}-{this.state.minute}</Text>
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
    const constDate = new Date(this.state.date);
    if (Platform.OS === 'ios'){
      return (
        <DatePickerIOS
          date={this.state.date || new Date()}
          onDateChange={this.callAndroidDatePicker}
        />
      );
    }
    return (
      <View style={styles.inputContainer}>
        <Text  style={styles.inputTitle}>{strings('Daybook.date')}</Text>
        <TouchableOpacity
          onPress={this.callAndroidDatePicker}
        >
            <Text style={styles.inputContent}>
              {constDate.getMonth()+1}-{constDate.getDate()}-{constDate.getFullYear()}
            </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render(){
    if (Platform.OS === 'ios'){
      return null;
    }
    return(
      <View style={this.props.style}>
        {this.getNativeDatePicker()}
        {this.getNativeTimePicker()}
      </View>
    )
  }
}


styles = StyleSheet.create({
  inputTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    position: 'absolute',
    left: 0
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  inputContent: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center'
  },
  bottomInputTitle: {
    position: 'absolute',
    color: 'grey',
    bottom: -20,
    fontSize: 12,
    alignSelf: 'center',
  },
});
