import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";

import dismissKeyboard from "dismissKeyboard";

import Chat from "../chat/Chat";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channel: ""
    };

    this.enterChat = this.enterChat.bind(this);
  }

  enterChat() {
    const { navigate } = this.props.navigation;
    navigate("Chat", { channel: this.state.channel });

    dismissKeyboard();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={"Channel name"}
          returnKeyType="next"
          autoCapitalize="none"
          onChangeText={channel => this.setState({ channel })}
          value={this.state.channel}
          underlineColorAndroid="transparent"
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={this.enterChat}>
          <Text style={styles.buttonTitle}>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },
  textInput: {
    width: 110,
    margin: 10,
    padding: 3,
    fontSize: 16
  },
  button: {
    backgroundColor: "lightseagreen",
    height: 40,
    margin: 10,
    width: 100,
    borderRadius: 5,
    padding: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold"
  }
});
