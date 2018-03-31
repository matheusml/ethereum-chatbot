import React from "react";
import { ListView } from "react-native";

import MessageList from "./MessageList";

import renderer from "react-test-renderer";

const props = {
  messages: new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
  })
};

describe("MessageList", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(<MessageList {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
