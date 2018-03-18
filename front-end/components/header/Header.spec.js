import React from "react";

import Header from "./Header";

import renderer from "react-test-renderer";

const props = {
  title: "channel title"
};

describe("Header", () => {
  it("should match snapshot without props", () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot with props", () => {
    const tree = renderer.create(<Header {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
