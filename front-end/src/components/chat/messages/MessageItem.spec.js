import React from "react";

import MessageItem from "./MessageItem";

import renderer from "react-test-renderer";

describe("MessageItem", () => {
  it("should match regular message snapshot", () => {
    const props = {
      item: {
        sender: "Sender",
        message: "message"
      }
    };
    const tree = renderer.create(<MessageItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should match balance message snapshot", () => {
    const props = {
      item: {
        sender: "Sender",
        message: {
          balance: 1
        }
      }
    };
    const tree = renderer.create(<MessageItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should match transaction message snapshot", () => {
    const props = {
      item: {
        sender: "Sender",
        message: {
          transaction: {
            blockHash: 0,
            from: 1,
            to: 2,
            value: 3,
            gas: 4
          }
        }
      }
    };
    const tree = renderer.create(<MessageItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
