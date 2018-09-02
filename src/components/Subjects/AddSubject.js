import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Divider, Button } from 'react-native-material-ui';

import Input from './../../components/common/Input';
import { strings } from './../../functions/i18n';
import { subjectsActions } from './../../reducers/subjectsReducer';


function mapStateToProps(state) {
  return {
    newSubjectName: state.subjects.newSubjectName,
  };
}

@connect(mapStateToProps)
export default class AddSubject extends Component {
  static defaultProps = {
    newSubjectName: ''
  };

  static propTypes = {
    newSubjectName: PropTypes.string
  };

  addSubject() {
    subjectsActions.addSubject(this.props.newSubjectName);
    subjectsActions.updateState({ isAddingSubject: false, newSubjectName: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Divider/>
        <Input autoFocus={true} style={styles.input}
               value={this.props.newSubjectName}
               placeholder={strings('Subjects.subject')}
               onChange={(value) => subjectsActions.updateState({ newSubjectName: value })}/>
        <Button style={buttonStyle}
                onPress={() => this.addSubject()}
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
