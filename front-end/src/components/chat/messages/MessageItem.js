import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

export default class MessageItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.row}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    );
  }
}

MessageItem.propTypes = {
  item: PropTypes.shape({
    sender: PropTypes.string,
    message: PropTypes.string
  })
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  message: {
    fontSize: 16,
    flex: 0.9,
    flexDirection: "column"
  },
  sender: {
    fontWeight: "bold",
    paddingRight: 10
  }
});
