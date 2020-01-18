import React from "react";
import { View } from "react-native";

type DummyProp = {
    msg: string
}

export class HabitScreen extends React.Component<DummyProp> {
    constructor(props) {
        super(props);
    }
      
    render() {  
      return (
        <View></View>
      );
    }
  }