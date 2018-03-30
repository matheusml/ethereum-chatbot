import React from "react";
import { StackNavigator } from "react-navigation";

import Home from "../home/Home";
import Chat from "../chat/Chat";

const Routes = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default Routes;
