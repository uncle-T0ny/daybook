import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList, Text
} from 'react-native';
import {
  Toolbar,
  Icon,
  ListItem,
  ActionButton
} from 'react-native-material-ui';

import { strings } from '../functions/i18n';
import constants from '../constants';
import getColorForItems from '../functions/getColorForItems';

const iconStyle = constants.iconStyle;


export default class Subjects extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          centerElement={strings('Subjects.title')}
          rightElement={ <Icon name={'add-circle-outline'} style={[iconStyle, {color: 'white', marginRight: 10}]}/>}

          onRightElementPress={() => {}}
        />
        <FlatList
          style={styles.flatList}
          renderItem={({item, index}) =>
            <ListItem
              key={index}
              dense={true}
              divider
              style={{centerElementContainer: {marginLeft: 10, paddingLeft: 10, borderLeftColor: getColorForItems(index), borderLeftWidth: 2}}}
              centerElement={{
                primaryText: item.name
              }}
              rightElement={
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
              }
              onPress={() => {}}
            />
          }

          data={[
            {id: 1, name: 'physics'},
            {id: 2, name: 'chemystry'},
            {id: 3, name: 'mathematics'},
            {id: 4, name: 'literacy'},
            {id: 5, name: 'English'},
            {id: 6, name: 'Deutsh'},
            {id: 7, name: 'history'},
            {id: 8, name: 'geometry'},
          ]}
          keyExtractor={(item, index) => item.id.toString()}
        />
        <ActionButton
          onPress={() => {}}
          icon={'add'}

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatList: {
    marginTop: 10
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
  }
});
