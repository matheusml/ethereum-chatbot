import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

export default class MessageItem extends React.Component {
  constructor(props) {
    super(props);

    this.renderContent = this.renderContent.bind(this);
    this.renderTransaction = this.renderTransaction.bind(this);
    this.renderBalance = this.renderBalance.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
  }

  renderBalance({ balance }) {
    return <Text style={styles.balance}>Balance: {balance} (Wei)</Text>;
  }

  renderTransaction({ transaction }) {
    return (
      <View>
        <Text style={styles.transaction}>
          Block hash: {transaction.blockHash}
        </Text>
        <Text style={styles.transaction}>From: {transaction.from}</Text>
        <Text style={styles.transaction}>To: {transaction.to}</Text>
        <Text style={styles.transaction}>Value: {transaction.value}</Text>
        <Text style={styles.transaction}>Gas: {transaction.gas}</Text>
      </View>
    );
  }

  renderMessage(message, error) {
    if (error) {
      return <Text style={styles.errorMessage}>{message}</Text>;
    } else if (message.startsWith('/')) {
      return <Text style={styles.command}>{message}</Text>;
    }
    return <Text style={styles.message}>{message}</Text>;
  }

  renderContent(message, error) {
    if (message.transaction) {
      return this.renderTransaction(message);
    } else if (message.balance) {
      return this.renderBalance(message);
    }
    return this.renderMessage(message, error);
  }

  render() {
    const { item: { sender, message, error } } = this.props;
    return (
      <View style={styles.row}>
        <Text style={styles.sender}>{sender}</Text>
        {this.renderContent(message, error)}
      </View>
    );
  }
}

MessageItem.propTypes = {
  item: PropTypes.shape({
    sender: PropTypes.string,
    message: PropTypes.any
  }).isRequired
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "column",
    flex: 0.9
  },
  balance: {
    fontSize: 16,
    fontStyle: "italic"
  },
  transaction: {
    fontSize: 12,
    fontStyle: "italic"
  },
  message: {
    fontSize: 16
  },
  command: {
    fontSize: 16,
    fontStyle: "italic",
    color: '#696969'
  },
  errorMessage: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#daa520'
  },
  sender: {
    fontWeight: "bold",
    paddingRight: 10
  }
});
