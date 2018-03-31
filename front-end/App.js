import React from "react";

import Routes from "./src/components/routes/Routes";

/*
  Setting timers for multiple minutes isn't handled properly in React Native on Android.
  The line above "solves" the problem. 
  More info here: https://github.com/facebook/react-native/issues/12981
*/
console.ignoredYellowBox = ["Setting a timer"];

export default class App extends React.Component {
  render() {
    return <Routes />;
  }
}
