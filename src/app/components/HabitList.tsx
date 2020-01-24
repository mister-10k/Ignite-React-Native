import React from "react";
import { View, StyleSheet } from "react-native";
import { CardProp } from "../types";

type DummyProp = {
    msg?: string
}

export class HabitList extends React.Component<DummyProp> {
    render() {  
      return (
        <View></View>
      );
    }

      styles = StyleSheet.create({
      });
}