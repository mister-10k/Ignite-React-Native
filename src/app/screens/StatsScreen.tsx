import React from "react";
import { View } from "react-native";

type DummyProp = {
    msg: string
}

export class StatsScreen extends React.Component<DummyProp> {
    constructor(props) {
        super(props);
    }
      
    render() {  
      return (
        <View></View>
      );
    }
  }