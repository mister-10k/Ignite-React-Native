import React from "react";
import { View, Text } from "react-native";
import { Card } from "../components/Card";
import { ScrollView } from "react-native-gesture-handler";
import moment from 'moment';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Note } from "../components/Note";
import { BottomSheetHeader } from "../components/BottomSheetHeader";
import BottomSheet from 'reanimated-bottom-sheet'
import { Habit } from "../shared/types";

interface HomeScreenProp  {
}

interface HomeScreenState  {
  scrollEnabled: boolean,
  showNoteBottomSheet: boolean,
}

export class HomeScreen extends React.Component<HomeScreenProp, HomeScreenState> {
  constructor(props) {
    super(props);

    this.state = {
      scrollEnabled: true,
      showNoteBottomSheet: false
    };
  }

  onSwipeLeft = (gestureState) => {
    alert('hi');
    this.setState({scrollEnabled: false});
  }

  getCalendarStripDefaultTitle() {
    const currentDate = moment();
    const startDate = currentDate.startOf('isoWeek');
    const endDate = currentDate.endOf('isoWeek');

    if (startDate.month() == endDate.month()) {
      return startDate.format('MMMM YYYY');
    } else {
      return startDate.format("MMM 'YY") + ' - ' + endDate.format("MMM 'YY");
    }
  }

  openBottomSheet(habit: Habit) {
    this.setState({showNoteBottomSheet: true});
  }

  render() {  
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={this.state.scrollEnabled}>
          <Card title={this.getCalendarStripDefaultTitle()} componentType={"calendar"} paddingVertical={0}/>
          <Card title={"Habits"} componentType={"habitList"} paddingVertical={0}></Card>
        </ScrollView>     
      </View>
      // <GestureRecognizer
      //   onSwipeLeft={this.onSwipeLeft}
      //   config={config}
      // >
      // </GestureRecognizer>
    );
  }
}