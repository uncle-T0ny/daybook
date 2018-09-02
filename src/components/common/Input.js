import React, { Component } from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';


export default class Input extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    }
  }

  static propTypes = {
    autoFocus: PropTypes.bool,
    placeholder: PropTypes.string,
    style: ViewPropTypes.style,
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  static defaultProps = {
    autoFocus: false,
    placeholder: '',
    value: '',
  };

  render() {
    return <TextInput autoFocus={this.props.autoFocus}
                      placeholder={this.props.placeholder}
                      style={[styles.input, this.props.style]}
                      onChangeText={this.props.onChange}
                      value={this.state.value}/>;
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal: 5,
    paddingVertical: 5
  }
});
