import React from "react";
import { ListView, ScrollView } from "react-native";
import PropTypes from "prop-types";

import MessageItem from "./MessageItem";

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item) {
    return <MessageItem item={item} />;
  }

  render() {
    return (
      <ScrollView
        ref={ref => (this.scrollView = ref)}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.scrollView.scrollToEnd({ animated: true });
        }}
      >
        <ListView
          dataSource={this.props.messages}
          renderRow={this.renderItem}
          enableEmptySections={true}
        />
      </ScrollView>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.object.isRequired
};
