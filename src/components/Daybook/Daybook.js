import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { Toolbar, ListItem, Icon, COLOR } from 'react-native-material-ui';
import CalendarStrip from 'react-native-calendar-strip';

import { strings } from '../../functions/i18n';
import SegmentedControl from '../SegmentedControl';
import constants from '../../constants';
import { connect } from "react-redux";
import { daybook_Actions } from '../../reducers/daybookReducer';
import AddEditDaybookEvent, { actions } from "./addEditDaybookEvent";
import getColorForItems from "../../functions/getColorForItems"


const iconStyle = constants.iconStyle;

function mapStateToProps(state) {
  return {
    subjects: state.subjects.list,
    daybookEvents: state.daybook.daybookEvents,
    daybookAction: state.daybook.daybookAction
  };
}

@connect(mapStateToProps)
export default class Daybook extends Component {
  constructor(props){
    super(props);
    this.state = {ActiveMenuItem: 0, activeDay: new Date};
  }

  static propTypes = {
    subjects: PropTypes.array,
    daybookEvents: PropTypes.array,
    daybookAction: PropTypes.oneOf(Object.keys(actions))
  };

  deleteItem(itemDate) {
      daybook_Actions.deleteEvent(itemDate);
  }

  toggleSheduleMode = (val) => {
    this.setState({ActiveMenuItem: val});
  }

  getSheduleRightIcons(item) {
    if (this.state.ActiveMenuItem === 0) {
      return(
        <View style={styles.rightElement}>
          <TouchableOpacity
            style={styles.rightElementButton}
            onPress={() => daybook_Actions.updateState(
              { daybookAction: actions.edit, oldDate: item.date, date: item.date, room: item.room, subject: item.subjectId }
            )}
          >
            <Icon
              name={'create'}
              style={iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rightElementButton}
            onPress={() => this.deleteItem(item.date)}
          >
            <Icon
              name={'delete'}
              style={iconStyle}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.rightElement}>
        <TouchableOpacity style={styles.rightElementButton}>
          <Icon
            name={'keyboard'}
            style={iconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightElementButton}>
          <Icon
            name={'photo-camera'}
            style={iconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }

  getWeekDay(ind){
    var gsDayNames = [
      strings('WeekDays.Sunday'),
      strings('WeekDays.Monday'),
      strings('WeekDays.Tuesday'),
      strings('WeekDays.Wednesday'),
      strings('WeekDays.Thursday'),
      strings('WeekDays.Friday'),
      strings('WeekDays.Saturday')
    ];
    return gsDayNames[ind];
  }

  getCurrWeekArr(activeDay) {
    const rez = [];
    for (let i = 0; i < 7; i++){
      const d = new Date(activeDay);
      let day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1) + i; // adjust when day is sunday
      const rezDate = new Date(d.setDate(diff));
      rezDate.setHours(0,0,0,0);
      rez.push(
        {
          title: `${this.getWeekDay(rezDate.getDay())} ${rezDate.getDate()} `,
          dateForTitle: rezDate.getTime(),
          subjectsQuantity: 0,
          data: []
        }
      );
    }
    return rez;
  }

  prepareSectionsData() {
    const currWeekArr = this.getCurrWeekArr(this.state.activeDay);
    const firstDateInInterval = currWeekArr[0].dateForTitle;
    const lastDateInInterval = currWeekArr[6].dateForTitle;

    for (let i = 0; i < this.props.daybookEvents.length; i++){
      const item = this.props.daybookEvents[i];
      const currDay = new Date(item.date);
      const endLessonDate = new Date(item.date);
      endLessonDate.setMinutes(endLessonDate.getMinutes() + 45);
      if (currDay > firstDateInInterval) {
        if (currDay > lastDateInInterval) {
          break;
        }
        let currDayNumber = currDay.getDay();
        let currDayNumberFromMonday = currDayNumber !== 0 ? currDayNumber - 1 : 6;
        const dayInArr = currWeekArr[currDayNumberFromMonday];
        const subjObj = this.props.subjects.find((subjEl) => subjEl.id === item.subject);
        const subjObjName = subjObj && subjObj.name || '';
        const subjObjId = subjObj && subjObj.id || '';
        dayInArr.subjectsQuantity++;
        dayInArr.data.push(
          {
              subject: subjObjName,
              subjectId: subjObjId,
              room: item.room,
              beginsAt: `${currDay.getHours()}:${currDay.getMinutes()}`,
              endsAt: `${endLessonDate.getHours()}:${endLessonDate.getMinutes()}`,
              date: item.date
          }
        );
      }
    }
    return currWeekArr;
  }

  addEvent(beginingDayDate) {
    daybook_Actions.updateState({
      daybookAction: actions.add,
      date: beginingDayDate,
      subject: this.props.subjects.length ? this.props.subjects[0].id : ''
    });
  }

  scrollToItem = (date) => {
    this.setState(
      {activeDay: date},
      () => this.daybookList.scrollToLocation({
        itemIndex: 0,
        sectionIndex: date.day()? date.day() -1: 7,
        animated: true,
        viewPosition: 0.5
      })
    );
  }

  renderItem = ({item, index, section}) =>
    <ListItem
      key={index}
      dense={true}
      divider
      leftElement={
        <View style={[styles.leftElement, {borderRightColor: getColorForItems(item.subjectId)}]}>
          <Text>{item.beginsAt}</Text>
          <Text>{item.endsAt}</Text>
        </View>
      }
      rightElement={this.getSheduleRightIcons(item)}
      centerElement={{
        primaryText: item.subject,
        secondaryText: item.room,
      }}
      onPress={() => {
      }}
    />

  renderSectionHeader = ({section: {title, dateForTitle}}) => (
    <View style={styles.subheaderContainer}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
      {this.state.ActiveMenuItem === 0 &&
      <TouchableOpacity
        onPress={() => this.addEvent(dateForTitle)}
      >
        <Icon
          name={'add-circle-outline'}
          style={iconStyle}
        />
      </TouchableOpacity>
      }
    </View>
  )

  renderSectionFooter = ({section: {title, dateForTitle, subjectsQuantity}}) => {
    if (this.state.ActiveMenuItem === 0 && subjectsQuantity) {
      return (
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => this.addEvent(dateForTitle)}
          >
            <View style={styles.bottomItemTextContainer}>
              <Text style={styles.sectionHeaderText}>{strings('Daybook.addSubject')}</Text>
              <Icon
                name={'add-circle-outline'}
                style={iconStyle}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar

          centerElement={strings('Daybook.title')}
          rightElement={
            <SegmentedControl
              itemNames={[
                strings('Daybook.editShedule'),
                strings('Daybook.setAssigns')
              ]}
              activeItem={this.state.ActiveMenuItem}
              onPress={this.toggleSheduleMode}
              activeColor={'green'}
              basicColor={'white'}
            />
          }
          style={{rightElementContainer: styles.rightElementStyle}}
        />
        <CalendarStrip
          calendarAnimation={{type: 'sequence', duration: 30}}
          daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
          style={{height: 110, paddingTop: 5, paddingBottom: 5}}
          calendarHeaderStyle={{color: 'black'}}
          calendarColor={'white'}
          dateNumberStyle={{color: 'black'}}
          dateNameStyle={{color: 'black'}}
          highlightDateNumberStyle={{color: 'red'}}
          highlightDateNameStyle={{color: 'red'}}
          disabledDateNameStyle={{color: 'grey'}}
          disabledDateNumberStyle={{color: 'grey'}}
          showMonth={true}
          onDateSelected={(date) => {this.scrollToItem(date);}}
          onWeekChanged={(date) => {this.scrollToItem(date);}}
          iconContainer={{flex: 0.1}}
        />
        <SectionList
          ref={(ref) => { this.daybookList = ref;}}
          stickySectionHeadersEnabled={false}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          renderSectionFooter={this.renderSectionFooter}
          sections={this.prepareSectionsData()}
          keyExtractor={(item, index) => item + index}
        />
        <AddEditDaybookEvent/>
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
  },
  leftElement: {
    borderRightWidth: 2,
    paddingRight: 5,
    marginRight: 5
  },
  rightElement: {
    flexDirection: 'row'
  },
  rightElementButton: {
    marginRight: 10,
    marginLeft: 10
  },
  rightElementStyle: {
    marginRight: 20
  },
  subheaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 15,
    backgroundColor: COLOR.green50,
    height: 44
  },
  footerContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 50,
    paddingHorizontal: 15,
    backgroundColor: COLOR.green50,
    height: 34,
    marginVertical: 10,
  },
  sectionHeaderText: {
    fontSize: 24,
    marginRight: 10
  },
  bottomItemTextContainer: {
    flexDirection: 'row'
  }
});
