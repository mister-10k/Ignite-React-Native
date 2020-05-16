import React from "react";
import { View, ScrollView, AsyncStorage } from "react-native";
import { DarkTheme } from "../shared/themes/Dark";
import { Card } from "../components/Card";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, Habit, StatusLog, StatusLogType, CardAction, ChartType } from "../shared/types";
import moment from "moment";
import { HabitStats } from "../components/HabitStats";
import { DataShareService } from "../services/DataShare.service";

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'Habit'
>;


interface Props  {
  navigation: NavigationProp;
  route;
}

interface State {
  markedDates;
  loading: boolean;
  habit: Habit;
}

export class HabitScreen extends React.Component<Props, State> {
    frequencyAbbreviations: string;
    constructor(props) {
        super(props);

        this.state = {
          markedDates: [],
          loading: true,
          habit: null,
        };

        this.props.navigation.setOptions({
          title: '',
          headerBackTitle: ' ',
          headerTintColor: 'white'
        });

        this.initialize();
    }

    initialize() {
      AsyncStorage.getItem('habits').then((habitsJSONString) => {
        let habits = JSON.parse(habitsJSONString) as Array<Habit>;
        const habit = habits.find(x => x.id == this.props.route.params.habitId);

        this.setState({ habit: habit });
        this.setState({ markedDates: this.getMarkedDates() });
        this.frequencyAbbreviations =  DataShareService.getFrequencyAbbreviations(habit.frequency);

        this.props.navigation.setOptions({
          title: habit.name,
          headerBackTitle: ' ',
          headerTintColor: 'white'
        });

        this.setState({ loading: false });
      });
    }

    dateSelected = async (date: moment.Moment) => {
      const habits = JSON.parse(await AsyncStorage.getItem('habits')) as Array<Habit>;
      const habitIndex = habits.findIndex(x => x.id == this.state.habit.id);
      const statusLogIndex = habits[habitIndex].statusLog.findIndex(x => moment(x.date).isSame(date, 'day'));

      if (statusLogIndex == -1) { // add
        habits[habitIndex].statusLog.push({ type: StatusLogType.Complete, date: date});
        habits[habitIndex].statusLog.sort((a, b) => moment(a.date).diff(moment(b.date)));
      }
      else { // remove
        habits[habitIndex].statusLog = habits[habitIndex].statusLog.filter(x => !moment(x.date).isSame(date));
      }

      await AsyncStorage.setItem('habits', JSON.stringify(habits));
      this.setState({habit: habits[habitIndex]});
      this.setState({markedDates: this.getMarkedDates()});
    }

    getMarkedDates() {
      let markedDates = {};
      let i = 0;
      let streaking = false;
      const habitColor = this.state.habit.color;

      while(i < this.state.habit.statusLog.length) {
        const currDate = this.state.habit.statusLog[i].date;
        const dayAfter = moment(currDate).add(1, 'days');

        if (streaking) {
          if (this.state.habit.statusLog.findIndex(x => moment(x.date).isSame(dayAfter, 'day')) == -1) {
            streaking = false;
            markedDates[moment(currDate).format('YYYY-MM-DD')] = {selected: true, endingDay: true, color: habitColor, textColor: 'white'};
          } else {
            markedDates[moment(currDate).format('YYYY-MM-DD')] = {selected: true, color: habitColor, textColor: 'white'};
          }
        } else {
          if (this.state.habit.statusLog.findIndex(x => moment(x.date).isSame(dayAfter, 'day')) > -1) {
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
        this.state.loading ? <View></View> :
        <View style={{backgroundColor: DarkTheme.ACCENT_COLOR}}>
              <ScrollView 
                bounces={false}
                showsVerticalScrollIndicator={false} >
                  <Card
                    title={'Calendar'}
                    marginBottom={60}
                    actions={[this.frequencyAbbreviations]}
                    componentType={"calendar"}
                    paddingVertical={0}
                    data={{color: this.state.habit.color, markedDates: this.state.markedDates}}
                    cb1={this.dateSelected}
                  />

                  <HabitStats habit={this.state.habit}/>

                  
                  <Card
                    title={''}
                    marginTop={60}
                    actions={[CardAction.Weekly, CardAction.Monthly]}
                    componentType={"chart"}
                    paddingVertical={0}
                    data={{title: "Completion Rate",chartType: ChartType.CompletionRate, habit: this.state.habit}}
                  />

              </ScrollView>     
            </View>
      );
    }
  }