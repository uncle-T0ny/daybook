import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Divider, Button } from 'react-native-material-ui';

import Input from './../../components/common/Input';
import { strings } from './../../functions/i18n';
import { subjectsActions } from './../../reducers/subjectsReducer';

export const actions = {
  add: 'add',
  edit: 'edit',
  nope: 'nope'
};

function mapStateToProps(state) {
  return {
    subjectName: state.subjects.subjectName,
    subjectAction: state.subjects.subjectAction
  };
}

@connect(mapStateToProps)
export default class AddEditSubject extends Component {
  static propTypes = {
    subjectName: PropTypes.string,
    subjectId: PropTypes.number,
    subjectAction: PropTypes.oneOf(Object.keys(actions))
  };

  static defaultProps = {
    subjectName: '',
    subjectId: -1,
    subjectAction: actions.add
  };

  addEditSubject() {
    const { subjectAction, subjectName, subjectId } = this.props;
    if (subjectAction === actions.add) {
      subjectsActions.addSubject(subjectName);
    }

    if (subjectAction === actions.edit) {
      subjectsActions.editSubject(subjectId, subjectName);
    }

    subjectsActions.updateState({ subjectAction: actions.nope, subjectName: '' });
  }

  render() {
    if (this.props.subjectAction === actions.nope) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Divider/>
        <Input autoFocus={true} style={styles.input}
               placeholder={strings('Subjects.subject')}
               value={this.props.subjectName}
               onChange={(value) => subjectsActions.updateState({ subjectName: value })}/>
        <Button style={buttonStyle}
                onPress={() => this.addEditSubject()}
                raised
                primary
                text={strings('Common.save')}/>
        <Divider/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10
  },
  input: {
    marginVertical: 10,
    marginHorizontal: 10,
  }
});

const buttonStyle = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: 150,
    marginVertical: 10
  },
});
