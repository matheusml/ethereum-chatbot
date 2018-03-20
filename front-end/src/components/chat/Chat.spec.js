import React from "react";

import Chat from "./Chat";

import renderer from "react-test-renderer";

jest.mock("../../services/messages");

const sendMessageMock = require("../../services/messages").sendMessage;

describe("Chat", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(<Chat />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should have an initial state", () => {
    const instance = renderer.create(<Chat />).getInstance();
    expect(instance.state).toEqual({ messages: [] });
  });

  describe("sendMessage", () => {
    beforeEach(() => {
      sendMessageMock.mockImplementation(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              sender: "Sender from server",
              message: "Message from server"
            })
        })
      );
    });

    it("should invoke sendMessage", () => {
      const instance = renderer.create(<Chat />).getInstance();
      instance.sendMessage({
        sender: "Sender from client",
        message: "Message from client"
      });
      expect(sendMessageMock).toHaveBeenCalledWith();
    });
  });
});
