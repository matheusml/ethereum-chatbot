import React from "react";

import Chat from "./Chat";

import renderer from "react-test-renderer";

jest.mock("../../services/messages");

const sendMessageMock = require("../../services/messages").sendMessage;

const props = {
  navigation: {
    state: {
      params: {
        channel: "Channel"
      }
    }
  }
};

describe("Chat", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(<Chat {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should have an initial state", () => {
    const instance = renderer.create(<Chat {...props} />).getInstance();
    expect(instance.state).toEqual({ messages: [], loading: false });
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
      const instance = renderer.create(<Chat {...props} />).getInstance();
      instance.sendMessage({
        sender: "Sender from client",
        message: "Message from client"
      });
      expect(sendMessageMock).toHaveBeenCalledWith();
    });
  });
});
