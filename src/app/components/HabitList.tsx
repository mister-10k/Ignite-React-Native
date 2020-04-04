import React from "react";
import { View, StyleSheet, FlatList, Text, Dimensions, AsyncStorage } from "react-native";
import { HabitListDetail } from "./HabitListDetail";
import { Habit, StatusLogType } from "../shared/types";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { SwipeRow, SwipeListView } from 'react-native-swipe-list-view';
import { NoteBottomSheet } from "./NoteBottomSheet";
import RBSheet from "react-native-raw-bottom-sheet";
import { DarkTheme } from "../shared/themes/Dark";
import moment from "moment";

interface Props {
    navigation,
    selectedDate: moment.Moment
}

interface State {
  showBottomSheet: boolean;
  habits: Array<Habit>;
}

export class HabitList extends React.Component<Props, State> {
    openRowRefs = [];
    RBSheet: RBSheet;
    unsubscribe;

    constructor(props) {
      super(props);

      this.state = {
        showBottomSheet: false,
        habits: []
      };

      this.unsubscribe = this.props.navigation.addListener('focus', () => {
        this.getHabits();
      });
    }

    componentDidUpdate(prevProps) {
      if(!this.props.selectedDate.isSame(prevProps.selectedDate, 'day'))
      {
        this.getHabits();
      }
    } 

    componentWillUnmount() {
      this.unsubscribe();
    }

    getHabits() {
      AsyncStorage.getItem('habits').then((habitsJSONString) => {
        let habits = JSON.parse(habitsJSONString);
        const dayIndex = this.props.selectedDate.day();
        habits = habits.filter(habit => habit.frequency.includes(dayIndex));
        this.setState({ habits: habits});
      });
    }

    // habits: Habit [] = [
    //   { id: 1, icon: '', name: 'journal', streak: 123, color: '#DC6788', frequency: [] },
    //   { id: 2, icon: '', name: 'meditate', streak: 10,  color: '#67B7DC', frequency: [] },
    //   { id: 3, icon: '', name: 'read/podcast', streak: 13,  color: '#6794DC', frequency: [] },
    //   { id: 4, icon: '', name: 'Plan One Thing', streak: 1,  color: '#6771DC', frequency: [] },
    //   { id: 5, icon: '', name: 'hiiiii', streak: 111,  color: '#8067DC', frequency: [] },
    //   { id: 6, icon: '', name: 'byeeeee', streak: 111,  color: '#A367DC', frequency: [] },
    //   { id: 7, icon: '', name: 'run', streak: 111,  color: '#C767DC', frequency: [] },
    //   { id: 8, icon: '', name: 'Swim', streak: 111,  color: '#DC67CE', frequency: [] }
    // ]

    onRowOpen = (rowKey, rowMap) => {
      this.RBSheet.open();
      const ref = rowMap[rowKey];
      ref.closeRow && ref.closeRow()
    }

    closeBottomSheet = () => {
      this.RBSheet.close();
    }
    
    render() {  
      return (
        <View>
          {
          this.state.habits.length > 0 ?
          <View>
            <SwipeListView
              keyExtractor={(item, index) => item.id.toString()}
              data={this.state.habits}
              onRowOpen={this.onRowOpen}
              renderItem={ (data, rowMap) => (
                <View style={this.styles.rowFront}>
                  <HabitListDetail 
                    key={data.item.id}
                    checked={data.item.statusLog.findIndex(x => this.props.selectedDate.isSame(moment(x.date), 'day') && x.type == StatusLogType.Complete) > -1}
                    selectedDate={this.props.selectedDate}
                    habit={data.item}
                    bottomDivider={data.index != this.state.habits.length - 1}
                  />
                </View>
              )}
              renderHiddenItem={ (data, rowMap) => (
                  <View style={[this.styles.rowBack, {backgroundColor: data.item.color ? data.item.color : "#858586"}]}>
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

            <RBSheet
              ref={ref => {
                this.RBSheet = ref;
              }}
              closeOnDragDown
              height={Dimensions.get('window').height * 0.95}
              duration={250}
              customStyles={{
                container: {
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  marginTop: 40
                  // position: 'absolute',
                  // top: 50
                },
                draggableIcon: { display: 'none'}
              }}
            >
              <NoteBottomSheet closeBottomSheet={this.closeBottomSheet} leftBtnName={'Cancel'} title={'Note'} rightBtnName={'Save'}/>
            </RBSheet>
          </View>
          : <View style={{height: Dimensions.get('window').height * 0.55}}></View>
          }
        </View>
          
      );
    }

      styles = StyleSheet.create({
        rowFront: {
          alignItems: 'center',
          backgroundColor: DarkTheme.PRIMARY_COLOR,
          justifyContent: 'center',
        },
        rowBack: {
          alignItems: 'center',
          // backgroundColor: '#858586',
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