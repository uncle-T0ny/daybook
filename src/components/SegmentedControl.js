import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';


export default class SegmentedControl extends Component {
  getButtons(){
    return this.props.itemNames.map(
        (val, ind) =>
          <TouchableOpacity
            key={ind}
            onPress={() => this.props.onPress(ind)}
            style={this.props.activeItem === ind ?
              {backgroundColor: this.props.basicColor} :
              styles.inActiveItemWraper
            }
          >
            <Text
              style={[
                this.props.activeItem === ind ? {color: this.props.activeColor} :
                  {color: this.props.basicColor},
                styles.item
              ]}
            >
              {val}
            </Text>
          </TouchableOpacity>
      );
  }
  render(){
    return(
      <View style={[styles.container, {borderColor: this.props.basicColor}]}>
        {this.getButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
  inActiveItemWraper: {
    backgroundColor: 'transparent'
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 5
  }
});
