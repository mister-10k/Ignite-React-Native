import React from "react";
import { View, ScrollView } from "react-native";
import { DarkTheme } from "../shared/themes/Dark";
import { Card } from "../components/Card";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, Habit, StatusLog } from "../shared/types";
import moment from "moment";

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'Habit'
>;


interface Props  {
  navigation: NavigationProp
  route
}

interface State {
  markedDates
}

export class HabitScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
          markedDates: this.getMarkedDates(this.props.route.params.habit.statusLog)
        };

        this.props.navigation.setOptions({
          title: this.props.route.params.habit.name,
          headerBackTitle: ' ',
          headerTintColor: 'white'
        });
    }

    getMarkedDates(statusLog: Array<StatusLog>) {
      let markedDates = {};
      let i = 0;
      let streaking = false;
      const habitColor = this.props.route.params.habit.color;

      while(i < statusLog.length) {
        const currDate = statusLog[i].createdAt;
        const dayAfter = moment(currDate).add(1, 'days');

        if (streaking) {
          if (statusLog.findIndex(x => moment(x.createdAt).isSame(dayAfter, 'day')) == -1) {
            streaking = false;
            markedDates[moment(currDate).format('YYYY-MM-DD')] = {selected: true, endingDay: true, color: habitColor, textColor: 'white'};
          } else {
            markedDates[moment(currDate).format('YYYY-MM-DD')] = {selected: true, color: habitColor, textColor: 'white'};
          }
        } else {
          if (statusLog.findIndex(x => moment(x.createdAt).isSame(dayAfter, 'day')) > -1) {
            streaking = true;
            markedDates[moment(currDate).format('YYYY-MM-DD')] = {selected: true, startingDay: true, color: habitColor, textColor: 'white'};
          } else {
            markedDates[moment(currDate).format('YYYY-MM-DD')] = {selected: true, startingDay: true, endingDay: true, color: habitColor, textColor: 'white'};
          }
        }

        i++;
      }

      return markedDates;
    }
      
    render() {  
      return (
        <View style={{backgroundColor: DarkTheme.ACCENT_COLOR}}>
              <ScrollView 
                bounces={false}
                showsVerticalScrollIndicator={false} >
                  <Card
                    title={'Calendar'}
                    componentType={"calendar"}
                    paddingVertical={0}
                    data={{color: this.props.route.params.habit.color, markedDates: this.state.markedDates}}
                  />

              </ScrollView>     
            </View>
      );
    }
  }