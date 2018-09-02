import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  TouchableOpacity
} from 'react-native';
import {Toolbar, ListItem, Icon, COLOR} from 'react-native-material-ui';
import CalendarStrip from 'react-native-calendar-strip';

import {strings} from '../functions/i18n';
import SegmentedControl from './SegmentedControl';
import constants from '../constants';

const iconStyle = constants.iconStyle;

export default class Daybook extends Component {
  constructor(props){
    super(props);
    this.state = {ActiveMenuItem: 0};
  }

  getColorForItems(index) {
    const indEl = index.toString().split('').pop();
    switch (indEl) {
      case '1':
        return COLOR.amber900;
      case '2':
        return COLOR.green900;
      case '3':
        return COLOR.yellow900;
      case '4':
        return COLOR.red900;
      case '5':
        return COLOR.blue900;
      case '6':
        return COLOR.black;
      case '7':
        return COLOR.deepOrange900;
      case '8':
        return COLOR.indigo900;
      case '9':
        return COLOR.pink900;
      case '0':
        return COLOR.brown900;
    }
  }

  toggleSheduleMode = (val) => {
    this.setState({ActiveMenuItem: val});
  }

  getSheduleRightIcons() {
    if (this.state.ActiveMenuItem === 0) {
      return(
        <View style={styles.rightElement}>
          <TouchableOpacity style={styles.rightElementButton}>
            <Icon
              name={'create'}
              style={iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightElementButton}>
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

          iconContainer={{flex: 0.1}}
        />
        <SectionList
          stickySectionHeadersEnabled={false}
          renderItem={({item, index, section}) =>
            <ListItem
              key={index}
              dense={true}
              divider
              leftElement={
                <View style={[styles.leftElement, {borderRightColor: this.getColorForItems(index)}]}>
                  <Text>{item.beginsAt}</Text>
                  <Text>{item.endsAt}</Text>
                </View>
              }
              rightElement={this.getSheduleRightIcons()}
              centerElement={{
                primaryText: item.subject,
                secondaryText: item.room,
              }}
              onPress={() => {
              }}
            />
          }
          renderSectionHeader={({section: {title}}) => (
            <View style={styles.subheaderContainer}>
              <Text style={styles.sectionHeaderText}>{title}</Text>
              {this.state.ActiveMenuItem === 0 &&
                <TouchableOpacity>
                  <Icon
                    name={'add-circle-outline'}
                    style={iconStyle}
                  />
                </TouchableOpacity>
              }
            </View>
          )}
          sections={[
            {
              title: 'Today', data: [
                {subject: 'physics', room: '301', beginsAt: '08:00', endsAt: '08:45'},
                {subject: 'chemystry', room: '211', beginsAt: '08:55', endsAt: '09:40'},
                {subject: 'mathematics', room: '301', beginsAt: '09:50', endsAt: '10:35'},
                {subject: 'literacy', room: '215', beginsAt: '10:45', endsAt: '11:30'},
                {subject: 'English', room: '311', beginsAt: '11:40', endsAt: '12:25'},
                {subject: 'Deutsh', room: '210', beginsAt: '12:55', endsAt: '13:40'},

              ]
            },
            {
              title: 'Tomorrow', data: [
                {subject: 'English', room: '105', beginsAt: '08:00', endsAt: '08:45'},
                {subject: 'mathematics', room: '201', beginsAt: '08:55', endsAt: '09:40'},
                {subject: 'literacy', room: '215', beginsAt: '09:50', endsAt: '10:35'},
                {subject: 'English', room: '311', beginsAt: '10:45', endsAt: '11:30'},
                {subject: 'history', room: '311', beginsAt: '11:40', endsAt: '12:25'},
              ]
            }
          ]}
          keyExtractor={(item, index) => item + index}
        />

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
    paddingHorizontal: 15,
    backgroundColor: COLOR.green50,
    height: 44
  },
  sectionHeaderText: {
    fontSize: 24
  }
});
