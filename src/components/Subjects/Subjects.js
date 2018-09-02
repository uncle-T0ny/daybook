import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ActionButton, ListItem, Button } from 'react-native-material-ui';

import AddSubject, { actions } from './AddEditSubject';
import { subjectsActions } from './../../reducers/subjectsReducer';

import { strings } from './../../functions/i18n';


function mapStateToProps(state) {
  return {
    subjects: state.subjects.list,
    subjectAction: state.subjects.subjectAction
  };
}

@connect(mapStateToProps)
export default class Subjects extends Component {
  constructor() {
    super();
    this.state = {
      pressedSubjectId: -1
    };
  }

  static propTypes = {
    subjects: PropTypes.array,
    subjectAction: PropTypes.oneOf(Object.keys(actions))
  };

  static defaultProps = {
    subjects: [],
    subjectAction: actions.add
  };

  onItemLongPress(subjectId) {
    this.setState({ pressedSubjectId: subjectId });
  }

  editSubject(subjectName) {
    subjectsActions.updateState({ subjectAction: actions.edit, subjectName });
  }

  deleteSubject(subjectId) {
    subjectsActions.deleteSubject(subjectId);
  }

  render() {
    const { subjects } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{strings('Subjects.title')}</Text>

        <AddSubject subjectId={this.state.pressedSubjectId}/>

        <ScrollView>
          {subjects.map((subject, i) => {
            return <ListItem divider
                             key={`Subject_${subject.name}_${i}`}
                             centerElement={{ primaryText: subject.name }}
                             onLongPress={(item) => this.onItemLongPress(subject.id)}
                             rightElement={this.state.pressedSubjectId === subject.id ? (
                               <View style={styles.actionButtons}>
                                 <Button onPress={() => this.editSubject(subject.name)} accent icon="edit" text=""/>
                                 <Button onPress={() => this.deleteSubject(subject.id)} accent icon="delete" text=""/>
                               </View>
                             ) : null}/>
          })}
        </ScrollView>


        <ActionButton
          onPress={() => subjectsActions.updateState({ subjectAction: this.props.subjectAction === actions.add ? actions.nope : actions.add })}
                      icon={this.props.subjectAction === actions.add ? 'close' : 'add'}/>
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
  actionButtons: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  }
});
