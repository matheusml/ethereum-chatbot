import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>#{this.props.title}</Text>
      </View>
    );
  }
}

Header.defaultProps = {
  title: "Channel"
};

Header.propTypes = {
  title: PropTypes.string
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: "#0aa6dd",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24
  }
});
