import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { HabitListDetail } from "./HabitListDetail";
import { Habit } from "../shared/types";
import { ListItem, CheckBox } from 'react-native-elements';
import { Ionicons } from "@expo/vector-icons";

type DummyProp = {
    msg?: string
}

export class HabitList extends React.Component<DummyProp, {checked1}> {
    constructor(props) {
      super(props);

      this.state = {
        checked1: true
      };
    }

    habits: Habit [] = [
      { id: 1, icon: '', name: 'journal', streak: 123 },
      { id: 2, icon: '', name: 'meditate', streak: 10 },
      { id: 3, icon: '', name: 'read/podcast', streak: 13 },
      { id: 4, icon: '', name: 'Plan One Thing', streak: 1 },
      { id: 5, icon: '', name: 'lay bed', streak: 111 }
    ]

    changeCheckMarkState() {
      this.setState({ checked1: !this.state.checked1 });
    }
    
    render() {  
      return (
        <View>
          {this.habits.map((item, idx) => {
            return (<HabitListDetail key={item.id} habit={item} bottomDivider={idx != this.habits.length - 1}/>)
          })}
        </View>
      );
    }

      styles = StyleSheet.create({
        streakWrapper: {
          flex: 0.5,
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'flex-end',
          paddingRight: 20,
          width: 2
        },

        streakNumber: {
          marginTop: 7,
          marginLeft: 5,
          color: '#858586'
        }
      });
}