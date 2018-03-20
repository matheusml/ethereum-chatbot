import React from "react";

import MessageList from "./MessageList";

import renderer from "react-test-renderer";

const props = {
  messages: [
    {
      message: "new message",
      sender: "Sender"
    }
  ]
};

describe("MessageList", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(<MessageList {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
