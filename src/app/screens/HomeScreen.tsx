import React from "react";
import { View, Text } from "react-native";
import { Card } from "../components/Card";
import { ScrollView } from "react-native-gesture-handler";

type DummyProp = {
    msg: string
}

export class HomeScreen extends React.Component<DummyProp> {
    render() {  
      return (
        <ScrollView>
          <Card title={"Overview"} componentType={"calendar"}/>
          <Card title={"Habits"} componentType={"habitList"} paddingVertical={0}></Card>
        </ScrollView>
      );
    }
  }