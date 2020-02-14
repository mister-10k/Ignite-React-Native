import React from "react";
import { View, StyleSheet, FlatList, Text, Dimensions } from "react-native";
import { HabitListDetail } from "./HabitListDetail";
import { Habit } from "../shared/types";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { SwipeRow, SwipeListView } from 'react-native-swipe-list-view';
import { SheetBottom } from 'material-bread';
import { NoteBottomSheet } from "./NoteBottomSheet";

type DummyProp = {
    msg?: string
}

interface HabitListState {
  checked1: boolean;
  showBottomSheet: boolean;
}

export class HabitList extends React.Component<DummyProp, HabitListState> {
    openRowRefs = [];

    constructor(props) {
      super(props);

      this.state = {
        checked1: true,
        showBottomSheet: false
      };
    }

    habits: Habit [] = [
      { id: 1, icon: '', name: 'journal', streak: 123 },
      { id: 2, icon: '', name: 'meditate', streak: 10 },
      { id: 3, icon: '', name: 'read/podcast', streak: 13 },
      { id: 4, icon: '', name: 'Plan One Thing', streak: 1 },
      { id: 5, icon: '', name: 'hiiiii', streak: 111 },
      { id: 6, icon: '', name: 'byeeeee', streak: 111 },
      { id: 7, icon: '', name: 'whyyyyy', streak: 111 }
    ]

    changeCheckMarkState() {
      this.setState({ checked1: !this.state.checked1 });
    }

    onRowOpen = (rowKey, rowMap) => {
      this.setState({ showBottomSheet: true });
      const ref = rowMap[rowKey];
      ref.closeRow && ref.closeRow()
    }

    closeBottomSheet = () => {
      this.setState({ showBottomSheet: false });
    }
    
    render() {  
      return (
        <View>
          <SwipeListView
            keyExtractor={(item, index) => item.id.toString()}
            data={this.habits}
            onRowOpen={this.onRowOpen}
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
            closeOnRowBeginSwipe
            scrollEnabled={false}
          />

          <SheetBottom
            style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
            visible={this.state.showBottomSheet}
            onBackdropPress={() => this.setState({ showBottomSheet: false })}
            onSwipeDown={() => this.setState({ showBottomSheet: false })}>
            <NoteBottomSheet closeBottomSheet={this.closeBottomSheet} leftBtnName={'Cancel'} title={'Note'} rightBtnName={'Save'}/>
          </SheetBottom>
        </View>
          
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