import React from "react";
import { StyleSheet, View } from "react-native";

import Header from "../header/Header";
import MessageList from "./messages/MessageList";
import MessageInput from "./messages/MessageInput";
import * as messagesAPI from "../../services/messages";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(newMessage) {
    messagesAPI
      .sendMessage()
      .then(response => response.json())
      .then(message => {
        this.setState({
          messages: [...this.state.messages, newMessage, message]
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={"CHANNEL"} />
        <MessageList messages={this.state.messages} />
        <MessageInput sendMessage={this.sendMessage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
