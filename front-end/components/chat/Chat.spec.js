import React from "react";

import Chat from "./Chat";

import renderer from "react-test-renderer";

describe("Chat", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(<Chat />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should have an initial state", () => {
    const instance = renderer.create(<Chat />).getInstance();
    expect(instance.state).toEqual({ messages: [] });
  });

  it("should update the state when trigerring sendMessage", () => {
    const instance = renderer.create(<Chat />).getInstance();
    const newMessage = {
      message: "new message",
      sender: "sender"
    };
    instance.sendMessage(newMessage);
    expect(instance.state).toEqual({ messages: [newMessage] });
  });
});
