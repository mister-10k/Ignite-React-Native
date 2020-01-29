import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { HabitListDetailProp } from "../types";

export class HabitListDetail extends React.Component<HabitListDetailProp> {
    render() {  
      return (
        <View>
            <Text>{this.props.habit.name}</Text>
        </View>
      );
    }

      styles = StyleSheet.create({
      });
}