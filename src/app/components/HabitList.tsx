import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { HabitListDetail } from "./HabitListDetail";

type DummyProp = {
    msg?: string
}

export class HabitList extends React.Component<DummyProp> {
    habits = [
      { id: 1, icon: '', name: 'journal', streak: 123 },
      { id: 2, icon: '', name: 'meditate', streak: 10 },
      { id: 3, icon: '', name: 'read/podcast', streak: 13 },
      { id: 4, icon: '', name: 'Plan One Thing', streak: 1 },
      { id: 5, icon: '', name: 'lay bed', streak: 111 }
    ]
    
    render() {  
      return (
        <View>
          <FlatList
          keyExtractor={item => item.id.toString()} 
          data={this.habits} 
          renderItem={({ item }) => 
            <HabitListDetail habit={item}/>
          }
          />
        </View>
      );
    }

      styles = StyleSheet.create({
      });
}