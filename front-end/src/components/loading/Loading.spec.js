import React from "react";

import Loading from "./Loading";

import renderer from "react-test-renderer";

describe("Loading", () => {
  it("should match snapshot with loading as true", () => {
    const tree = renderer.create(<Loading loading={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot with loading as false", () => {
    const tree = renderer.create(<Loading loading={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
