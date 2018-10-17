import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Picker,
  Platform,
  Text,
  DatePickerIOS,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { Dialog, DialogDefaultActions} from 'react-native-material-ui';

import AndroidDateTimePicker from './../../components/common/AndroidDateTimePicker';
import Input from './../../components/common/Input';
import { strings } from './../../functions/i18n';
import { daybook_Actions } from './../../reducers/daybookReducer';
import getColorForItems from "../../functions/getColorForItems";
import PickerWrapperIos from '../common/PickerWrapperIos';
import AndroidItemPicker from '../common/AndroidItemPicker';
import { addZero } from "../../functions/formatFunctions";

export const actions = {
  add: 'add',
  edit: 'edit',
  nope: 'nope'
};

function mapStateToProps(state) {
  return {
    date: state.daybook.date,
    oldDate: state.daybook.oldDate,
    subject: state.daybook.subject,
    room: state.daybook.room,
    daybookAction: state.daybook.daybookAction,
    subjects: state.subjects.list,
  };
}

@connect(mapStateToProps)
export default class AddEditDaybookEvent extends Component {
  constructor(){
    super();
    this.state = {iosPickersVisibilityMode: 0}
  }

  static propTypes = {
    date: PropTypes.number,
    oldDate: PropTypes.number,
    subject: PropTypes.oneOfType([ PropTypes.string, PropTypes.number]),
    room: PropTypes.string,
    daybookAction: PropTypes.oneOf(Object.keys(actions))
  };

  static defaultProps = {
    date: 0,
    subject: '',
    room: '',
    daybookAction: actions.add
  };

  componentDidMount(){
  }

  componentWillUnmount() {
  }


  showIosPicker = (ind) => {
    this.setState({iosPickersVisibilityMode: ind});
  }

  hidePicker = () => {
    this.setState({iosPickersVisibilityMode: 0});
  }


  addEditEvent = () => {
    const { daybookAction, oldDate, date, subject, room } = this.props;
    if (daybookAction === actions.add) {
      daybook_Actions.addEvent(date, subject, room);
    }

    if (daybookAction === actions.edit) {
      daybook_Actions.editEvent(oldDate, date, subject, room);
    }

    daybook_Actions.updateState({ daybookAction: actions.nope, date: 0, subject: '', room: '' });
  }

  close = () => {
    daybook_Actions.updateState({ daybookAction: actions.nope, date: 0, subject: '', room: '' });
  }

  getSubjectName = () => {
    const subjObj = this.props.subjects.find((val) => val.id === this.props.subject);
    return subjObj ? subjObj.name : '';
  }

  renderPickerItems = () => {
    const rezArr = this.props.subjects.map((el) => {
      return (<Picker.Item key={el.id} label={el.name} value={el.id} />);
    });
    return rezArr;
  }

  onDateSelect = (val) => daybook_Actions.updateState({ date: val.getTime() });

  onPickerValueChange = (itemValue) => daybook_Actions.updateState({ subject: itemValue });

  getDialogTitle = () => {
    if (this.props.daybookAction === actions.add) {
      return strings("Daybook.addTitle");
    } else if (this.props.daybookAction === actions.edit){
      return strings("Daybook.editTitle");
    }
    return '';
  }

  getContainerBorderColor(dateObj, subj, room){
    return getColorForItems( dateObj.getHours() + dateObj.getMinutes() + subj + room);
  }


  getIosAndroidPickers = (dateObj) => {
    if (Platform.OS === 'ios') {
      return (
        <View>
          <PickerWrapperIos
            title={strings('Daybook.date')}
            currIndex={1}
            iosPickersVisibilityMode={this.state.iosPickersVisibilityMode}
            showIosDatePicker={this.showIosPicker}
            hidePicker={this.hidePicker}
            borderBottomColorVal={dateObj.getDate() + dateObj.getHours() + dateObj.getMinutes()}
            inputValPresentation={`${addZero(dateObj.getDate())}.${addZero(dateObj.getMonth()+1)}.${dateObj.getFullYear()}  ${addZero(dateObj.getHours())}:${addZero(dateObj.getMinutes())}`}
            pickerComponent={
              <DatePickerIOS
                date={new Date(this.props.date)}
                onDateChange={this.onDateSelect}
              />}
          />
          <PickerWrapperIos
            title={strings('Daybook.subject')}
            currIndex={2}
            iosPickersVisibilityMode={this.state.iosPickersVisibilityMode}
            showIosDatePicker={this.showIosPicker}
            hidePicker={this.hidePicker}
            borderBottomColorVal={this.props.subject}
            inputValPresentation={this.getSubjectName()}
            pickerComponent={
              <Picker
                selectedValue={this.props.subject}
                onValueChange={this.onPickerValueChange}
              >
                {this.renderPickerItems()}
              </Picker>
            }
          />
        </View>
      );
    }
    return (
      <View style={{flex: 1,}}>
        <AndroidDateTimePicker
          date={this.props.date}
          onDateSelect={this.onDateSelect}
        />
        <AndroidItemPicker
          subject={this.props.subject}
          onPickerValueChange={this.onPickerValueChange}
          items={this.renderPickerItems()}
        />
      </View>
    );
  }

  render() {
    const dateObj = new Date(this.props.date);
    if (this.props.daybookAction === actions.nope) {
      return null;
    }
    return(
      <View style={styles.dialogContainer}>
        <KeyboardAvoidingView style={{width: '100%'}} behavior="padding">
          <Dialog style={{container: [styles.dialogInnerContainer, {borderColor: this.getContainerBorderColor(dateObj, this.props.subject, Number(this.props.room))}]}}>
            <Dialog.Actions>
              <DialogDefaultActions
                style={{defaultActionsContainer: {height: 20}}}
                actions={['Cancel', 'OK']}
                onActionPress={(action) => {
                  if (action === 'OK') {
                    this.addEditEvent()
                  } else {
                    this.close();
                  }
                }}
              />
            </Dialog.Actions>

            <Dialog.Title style={{titleContainer: styles.topTitleContainer}}>
              <Text style={[styles.topTitle]}>{this.getDialogTitle()}</Text>
            </Dialog.Title>
            <Dialog.Content>
              <ScrollView>
                <View style={styles.containerIos}>
                  {this.getIosAndroidPickers(dateObj)}

                  <View style={styles.roomContainer}>
                    <Text style={styles.inputTitle}>
                      {strings('Daybook.room')}
                    </Text>
                    <Input
                           autoFocus={true}
                           style={[styles.input, {borderBottomColor: getColorForItems(Number(this.props.room))}]}
                           value={this.props.room}
                           placeholder={strings('Daybook.roomPlaceholder')}
                           onChange={(value) => {daybook_Actions.updateState({ room: value })}}
                           onFocus={this.hidePicker}
                           underlineColorAndroid={'transparent'}
                    />
                  </View>
                </View>
              </ScrollView>
            </Dialog.Content>
          </Dialog>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerIos: {
    paddingTop: 10,
    width: '100%'
  },
  containerAndroid: {
    paddingTop: 10,
    width: '100%',
    marginTop: 100
  },
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
    height: '100%'
  },
  defaultActionsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomContainer: {
    width: '66%',
    alignSelf: 'center'
  },
  input: {
    width: '100%',
    paddingVertical: 3,
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center',
  },
  androidInputTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginTop: 10
  },
  inputTitleContainerIos: {
    flexDirection: 'row'
  },
  buttonContainerAndroid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buttonContainerIos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  dialogContainer: {
    position: 'absolute',
    zIndex: 1000,
    elevation: 1000,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  dialogInnerContainer: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
  },
  topTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center'
  },
  topTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 0
  }
})
