import React from "react";
import { FlatList } from "react-native";
import PropTypes from "prop-types";

import MessageItem from "./MessageItem";

export default class MessageList extends React.Component {
  render() {
    return (
      <FlatList
        data={this.props.messages.reverse()}
        renderItem={({ item }) => <MessageItem item={item} />}
        keyExtractor={(item, index) => index}
        inverted
      />
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired
};
