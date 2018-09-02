import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ActionButton, ListItem, Button } from 'react-native-material-ui';

import AddSubject from './AddSubject';
import { subjectsActions } from './../../reducers/subjectsReducer';

import { strings } from './../../functions/i18n';


function mapStateToProps(state) {
  return {
    subjects: state.subjects.list,
    isAddingSubject: state.subjects.isAddingSubject
  };
}

@connect(mapStateToProps)
export default class Subjects extends Component {
  constructor() {
    super();
    this.state = {
      isAddingSubject: false,
      pressedSubjectId: -1
    };
  }

  static defaultProps = {
    isAddingSubject: false,
    subjects: []
  };

  static propTypes = {
    isAddingSubject: PropTypes.bool,
    subjects: PropTypes.array
  };

  onItemLongPress(subjectId) {
    this.setState({ pressedSubjectId: subjectId });
  }

  deleteSubject(subjectId) {
    subjectsActions.deleteSubject(subjectId)
  }

  render() {
    const { subjects } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{strings('Subjects.title')}</Text>

        {this.props.isAddingSubject && <AddSubject/>}

        <ScrollView>
          {subjects.map((subject, i) => {
            return <ListItem divider
                             key={`Subject_${subject.name}_${i}`}
                             centerElement={{ primaryText: subject.name }}
                             onLongPress={(item) => this.onItemLongPress(subject.id)}
                             rightElement={this.state.pressedSubjectId === subject.id ? (
                               <Button onPress={() => this.deleteSubject(subject.id)} accent icon="close" text={strings('Subjects.delete')} />
                             ) : null}
                             onPress={() => {}}/>
          })
          }
        </ScrollView>


        <ActionButton onPress={() => subjectsActions.updateState({ isAddingSubject: !this.props.isAddingSubject })}
                      icon={this.props.isAddingSubject ? 'close' : 'add'}/>
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
  }
});
