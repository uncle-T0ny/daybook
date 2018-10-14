import React, { Component } from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';


export default class Input extends Component {

  static propTypes = {
    autoFocus: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    style: ViewPropTypes.style,
    onChange: PropTypes.func,
    value: PropTypes.string,
    underlineColorAndroid: PropTypes.string
  };

  static defaultProps = {
    autoFocus: false,
    placeholder: '',
    value: '',
    underlineColorAndroid: 'transparent'
  };

  render() {
    return <TextInput
      autoFocus={this.props.autoFocus}
      placeholder={this.props.placeholder}
      style={[styles.input, this.props.style]}
      onChangeText={this.props.onChange}
      onFocus={this.props.onFocus}
      value={this.props.value}
      underlineColorAndroid={this.props.underlineColorAndroid}
    />;
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
