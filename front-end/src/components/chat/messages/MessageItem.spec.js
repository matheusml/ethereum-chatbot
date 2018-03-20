import React from "react";

import MessageItem from "./MessageItem";

import renderer from "react-test-renderer";

const props = {
  item: {
    sender: "Sender",
    message: "message"
  }
};

describe("MessageItem", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(<MessageItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
