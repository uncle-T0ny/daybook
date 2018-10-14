import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Toolbar, Icon, ListItem, Button, COLOR } from 'react-native-material-ui';

import { strings } from '../functions/i18n';
import constants from '../constants';
import getColorForItems from "../functions/getColorForItems";

const iconStyle = constants.iconStyle;


export default class Teachers extends Component {

  addElement(){

  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          centerElement={strings('Teachers.title')}
          rightElement={
            <Button
              text={strings('Teachers.addTeacher')}
              style={{container: styles.addTeacherButton, text: styles.addTeacherButtonText}}
              onPress={() => this.addElement()}
            />
          }
          style={{centerElementContainer: styles.centerElementStyle}}
        />
        <FlatList

          renderItem={({item, index}) =>
            <ListItem
              key={index}
              dense={true}
              divider
              style={{centerElementContainer: {marginLeft: 10, paddingLeft: 10, borderLeftColor: getColorForItems(index), borderLeftWidth: 2}}}
              centerElement={{
                primaryText: `${item.surname} ${item.firstName} ${item.patronymic}`
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
            {id: 1, firstName: 'Olga', patronymic: 'Volodymyrivna', surname: 'Svitlichnaya'},
            {id: 2, firstName: 'Igor', patronymic: 'Bogdanovich', surname: 'Mychailov'},
            {id: 3, firstName: 'Helena', patronymic: 'Ivanovna', surname: 'Kovalenko'},
            {id: 4, firstName: 'Alex', patronymic: 'Igorevich', surname: 'Bondarev'},
            {id: 5, firstName: 'Mariya', patronymic: 'Volodymyrivna', surname: 'Beketova'},
            {id: 6, firstName: 'Tatyana', patronymic: 'Ivanovna', surname: 'Yarkaya'},
          ]}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightElement: {
    flexDirection: 'row'
  },
  addTeacherButton: {
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
  addTeacherButtonText: {
    color: COLOR.green400
  }
});
