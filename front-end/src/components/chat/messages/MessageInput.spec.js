import React from "react";
import dismissKeyboard from "dismissKeyboard";

import MessageInput from "./MessageInput";

import renderer from "react-test-renderer";

jest.mock("dismissKeyboard");

const sendMessageMock = jest.fn();

const props = {
  sendMessage: sendMessageMock,
  loading: false
};

describe("MessageInput", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(<MessageInput {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot with loading", () => {
    const tree = renderer
      .create(<MessageInput {...props} loading={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should have an initial state", () => {
    const instance = renderer.create(<MessageInput {...props} />).getInstance();
    expect(instance.state).toEqual({ typing: "" });
  });

  describe("sendMessage", () => {
    it("should update the state", () => {
      const instance = renderer
        .create(<MessageInput {...props} />)
        .getInstance();
      const newMessage = {
        message: "new message",
        sender: "You"
      };
      instance.sendMessage(newMessage);
      expect(instance.state).toEqual({ typing: "" });
    });

    it("should invoke dismissKeyboard", () => {
      const instance = renderer
        .create(<MessageInput {...props} />)
        .getInstance();
      const newMessage = {
        message: "new message",
        sender: "You"
      };
      instance.sendMessage(newMessage);
      expect(dismissKeyboard).toHaveBeenCalledWith();
    });

    it("should invoke sendMessage", () => {
      const instance = renderer
        .create(<MessageInput {...props} />)
        .getInstance();
      const newMessage = {
        message: "",
        sender: "You"
      };
      instance.sendMessage(newMessage);
      expect(sendMessageMock).toHaveBeenCalledWith(newMessage);
    });
  });
});
