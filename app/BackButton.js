import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';


const styles = StyleSheet.create({
  button: {
    padding: 5,
    backgroundColor: 'transparent',
    marginTop: 13,
    marginRight: 13,
    marginBottom: 13,
    marginLeft: 13,
  },
});

export default class BackButton extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  goBack = () => {
    const {
      navigation,
    } = this.props;

    navigation.goBack();
  };

  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.goBack}>
        <Text>Назад</Text>
      </TouchableOpacity>
    );
  }
}
