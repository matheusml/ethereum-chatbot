import React from "react";
import dismissKeyboard from "dismissKeyboard";

import Home from "./Home";

import renderer from "react-test-renderer";

jest.mock("dismissKeyboard");

const navigateMock = jest.fn();

const props = {
  navigation: {
    navigate: navigateMock
  }
};

describe("Home", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(<Home {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should have an initial state", () => {
    const instance = renderer.create(<Home {...props} />).getInstance();
    expect(instance.state).toEqual({ channel: "" });
  });

  describe("enterChat", () => {
    it("should invoke navigate", () => {
      const instance = renderer.create(<Home {...props} />).getInstance();
      instance.enterChat();
      expect(navigateMock).toHaveBeenCalled();
    });

    it("should invoke dismissKeyboard", () => {
      const instance = renderer.create(<Home {...props} />).getInstance();
      instance.enterChat();
      expect(dismissKeyboard).toHaveBeenCalled();
    });
  });
});
