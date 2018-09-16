import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, Picker, Platform, Text, TouchableOpacity, DatePickerIOS } from 'react-native';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';

import AndroidDateTimePicker from './../../components/common/AndroidDateTimePicker';
import Input from './../../components/common/Input';
import { strings } from './../../functions/i18n';
import { daybook_Actions } from './../../reducers/daybookReducer';

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

  showIosDatePicker = () => {
    this.setState({iosPickersVisibilityMode: 1});
  }

  showIosSubjectPicker = () => {
    this.setState({iosPickersVisibilityMode: 2});
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

  getIosAndroidPickers = () => {
    const dateObj = new Date(this.props.date);
    if (Platform.OS === 'ios') {
      return (
        <View>
          <View>
            <View style={styles.pickerPresentation}>
              <TouchableOpacity
                style={styles.inputTitlePickerContainer}
                onPress={this.showIosDatePicker}
              >
                <Text style={styles.inputTitlePickerPresentation}>
                  {strings('Daybook.date')}
                </Text>
                <Text style={styles.inputTitle}>
                  {dateObj.getHours()}-{dateObj.getMinutes()}-{dateObj.getMonth()+1}-{dateObj.getDate()}-{dateObj.getFullYear()}
                </Text>
                <Text style={styles.bottomInputTitle}>{strings('Daybook.tapToSelect')}</Text>
              </TouchableOpacity>
            </View>
            {
              this.state.iosPickersVisibilityMode === 1 &&
              <View style={styles.pickerItemStyle}>
                <DatePickerIOS
                  date={new Date(this.props.date)}
                  onDateChange={this.onDateSelect}
                />
                <TouchableOpacity
                  onPress={this.hidePicker}
                >
                  <Text style={styles.textClose}>
                    {strings('Common.close')}
                  </Text>
                </TouchableOpacity>
              </View>
            }
          </View>
          <View>
            <View style={styles.pickerPresentation}>

              <TouchableOpacity
                style={styles.inputTitlePickerContainer}
                onPress={this.showIosSubjectPicker}
              >
                <Text style={styles.inputTitlePickerPresentation}>
                  {strings('Daybook.subject')}
                </Text>
                <Text style={styles.inputTitle}>
                  {this.getSubjectName()}
                </Text>
                <Text style={styles.bottomInputTitle}>{strings('Daybook.tapToSelect')}</Text>
              </TouchableOpacity>
            </View>
            {
              this.state.iosPickersVisibilityMode === 2 &&
              <View>
                <Picker
                  selectedValue={this.props.subject}
                  onValueChange={this.onPickerValueChange}>
                  {this.renderPickerItems()}
                </Picker>
                <TouchableOpacity
                  onPress={this.hidePicker}
                >
                  <Text style={styles.textClose}>
                    {strings('Common.close')}
                  </Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        </View>
      );
    }
    return (
      <View>
        <AndroidDateTimePicker date={this.props.date} onDateSelect={this.onDateSelect}/>
        <Text style={styles.inputTitle}>
          {strings('Daybook.subject')}
        </Text>
        <Picker style={{flex: 1}}
          selectedValue={this.props.subject}
          onValueChange={this.onPickerValueChange}>
          {this.renderPickerItems()}
        </Picker>
      </View>
    );
  }

  render() {
    if (this.props.daybookAction === actions.nope) {
      return null;
    }
    return(
        <View style={styles.dialogContainer}>
          <Dialog style={{container: styles.dialogInnerContainer}}>
            <Dialog.Title style={{titleContainer: styles.topTitleContainer}}><Text style={styles.topTitle}>{this.getDialogTitle()}</Text></Dialog.Title>
            <Dialog.Content>
              <View style={styles.containerIos}>
                {this.getIosAndroidPickers()}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>
                    {strings('Daybook.room')}
                  </Text>
                  <Input autoFocus={true} style={styles.input}
                         value={this.props.room}
                         placeholder={strings('Daybook.roomPlaceholder')}
                         onChange={(value) => daybook_Actions.updateState({ room: value })}
                  />
                </View>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <DialogDefaultActions
                actions={['Cancel', 'Save']}
                onActionPress={(action) => {
                  if (action === 'Save') {
                    this.addEditEvent()
                  } else {
                    this.close();
                  }
                }}
              />
            </Dialog.Actions>
          </Dialog>
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
  input: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5,
    alignSelf: 'center'
  },
  inputContainer: {
    flexDirection: 'row'
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
  pickerPresentation: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  inputTitlePickerPresentation: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center'
  },
  dialogContainer: {
    position: 'absolute',
    zIndex: 1000,
    elevation: 1000,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dialogInnerContainer: {
    width: '95%',
    borderWidth: 1,
    borderRadius: 10
  },
  bottomInputTitle: {
    position: 'absolute',
    color: 'grey',
    bottom: -13,
    fontSize: 12,
    alignSelf: 'center'
  },
  inputTitlePickerContainer: {
    flex: 1
  },
  pickerItemStyle: {
    marginBottom: 15
  },
  textClose: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
    alignSelf: 'center'
  },
  topTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center'
  },
  topTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const buttonStyle = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: 10
  },
});
