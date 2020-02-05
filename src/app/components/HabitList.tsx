import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { HabitListDetail } from "./HabitListDetail";
import { Habit } from "../shared/types";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { SwipeRow, SwipeListView } from 'react-native-swipe-list-view';

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
          <SwipeListView
            data={this.habits}
            renderItem={ (data, rowMap) => (
              <View style={this.styles.rowFront}>
                <HabitListDetail key={data.item.id} habit={data.item} bottomDivider={data.index != this.habits.length - 1}/>
              </View>
            )}
            renderHiddenItem={ (data, rowMap) => (
                <View style={this.styles.rowBack}>
                    <Text style={this.styles.backTextWhite}></Text>
                    <SimpleLineIcons name="notebook" size={25} color="white"/>
                </View>
            )}
            stopLeftSwipe={1}
            rightOpenValue={-60}
            closeOnRowPress
            closeOnRowOpen
        />
      );
    }

      styles = StyleSheet.create({
        rowFront: {
          alignItems: 'center',
          backgroundColor: 'white',
          justifyContent: 'center',
        },
        rowBack: {
          alignItems: 'center',
          backgroundColor: '#FD5C5F',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
        },
        backTextWhite: {
          color: '#FFF',
        }
      });
}