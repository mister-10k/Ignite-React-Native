import React from "react";
import { View, Text } from "react-native";
import { Card } from "../components/Card";

type DummyProp = {
    msg: string
}

export class HomeScreen extends React.Component<DummyProp> {
    render() {  
      return (
        <View>
          <Card title={"Overview"} componentType={"calendar"}/>
        </View>
      );
    }
  }