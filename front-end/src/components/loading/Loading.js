import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class Loading extends React.Component {
  render() {
    const { loading } = this.props;
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    return null;
  }
}

Loading.propTypes = {
  loading: PropTypes.bool
};

const styles = StyleSheet.create({
  loading: {
    zIndex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    opacity: 0.6
  }
});
