import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import Header from "../header/Header";
import MessageList from "./messages/MessageList";
import MessageInput from "./messages/MessageInput";
import * as messagesAPI from "../../services/messages";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      loading: false
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(newMessage) {
    this.setState({ loading: true });

    messagesAPI
      .sendMessage()
      .then(response => response.json())
      .then(message => {
        this.setState({
          messages: [...this.state.messages, newMessage, message],
          loading: false
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={"CHANNEL"} />
        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
        <MessageList messages={this.state.messages} />
        <MessageInput
          loading={this.state.loading}
          sendMessage={this.sendMessage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
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
