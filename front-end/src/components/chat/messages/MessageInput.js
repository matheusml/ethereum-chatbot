import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

import dismissKeyboard from "dismissKeyboard";

export default class MessageInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { typing: "" };

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {
    const { typing } = this.state;

    const newMessage = {
      message: this.state.typing,
      sender: "You"
    };

    this.setState(
      {
        typing: ""
      },
      () => this.props.sendMessage(newMessage)
    );

    dismissKeyboard();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.footer}>
          <TextInput
            value={this.state.typing}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Send a message"
            onChangeText={typing => this.setState({ typing })}
            editable={!this.props.loading}
            selectTextOnFocus={!this.props.loading}
          />
          <TouchableOpacity
            disabled={this.props.loading}
            onPress={this.sendMessage}
          >
            <Text style={styles.send}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    backgroundColor: "#eee"
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 1
  },
  send: {
    alignSelf: "center",
    color: "#0aa6dd",
    fontSize: 16,
    fontWeight: "bold",
    padding: 20
  }
});
