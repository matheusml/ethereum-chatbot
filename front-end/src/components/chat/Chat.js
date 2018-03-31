import React from "react";
import { StyleSheet, View, ListView } from "react-native";
import PropTypes from "prop-types";

import Header from "../header/Header";
import MessageList from "./messages/MessageList";
import MessageInput from "./messages/MessageInput";
import Loading from "../loading/Loading";
import * as messagesAPI from "../../services/messages";
import firebaseApp from "../../config/firebase";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
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
      const items = [];
      snap.forEach(child => {
        items.push({
          sender: child.val().sender,
          message: child.val().message,
          _key: child.key
        });
      });

      this.setState({
        messages: this.state.messages.cloneWithRows(items)
      });
    });
  }

  sendMessage(newMessage) {
    this.setState({ loading: true });
    this.messagesRef.push(newMessage);

    messagesAPI
      .sendMessage(newMessage.message)
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
        <Loading loading={this.state.loading} />
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
  }
});
