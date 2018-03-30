import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

import Header from "../header/Header";
import MessageList from "./messages/MessageList";
import MessageInput from "./messages/MessageInput";
import * as messagesAPI from "../../services/messages";
import firebaseApp from "../../config/firebase";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      loading: false
    };

    this.messagesRef = firebaseApp
      .database()
      .ref()
      .child(props.navigation.state.params.channel);

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    // listening for changes on firebase real time database
    this.messagesRef.on("value", snap => {
      const messages = [];
      snap.forEach(child => {
        messages.push({
          sender: child.val().sender,
          message: child.val().message,
          _key: child.key
        });
      });

      this.setState({
        messages
      });
    });
  }

  sendMessage(newMessage) {
    this.setState({ loading: true });
    this.messagesRef.push(newMessage);

    messagesAPI
      .sendMessage()
      .then(response => response.json())
      .then(message => {
        this.messagesRef.push(message);
        this.setState({
          loading: false
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header title={navigation.state.params.channel} />
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

Chat.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        channel: PropTypes.string.isRequired
      })
    })
  })
};

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
