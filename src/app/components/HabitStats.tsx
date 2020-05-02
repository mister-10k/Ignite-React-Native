import React from "react";
import { View, StyleSheet } from "react-native";
import { HabitStat } from "./HabitStat";
import { DataShareService } from "../services/DataShare.service";
import { Habit } from "../shared/types";
import moment from "moment";

interface Props {
  habit: Habit
}

interface State {
  streak: number;
  completions: number;
  best: number;
}

export class HabitStats extends React.Component<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        streak: DataShareService.getStatusLogStreak(this.props.habit.statusLog, moment()),
        completions: DataShareService.getStatusLogCompletionsCount(this.props.habit.statusLog),
        best: DataShareService.getStatusLogBestCount(this.props.habit.statusLog)
      };
    }

    componentDidUpdate(prevProps) {
      if (!DataShareService.sameStatusLogs(this.props.habit.statusLog, prevProps.habit.statusLog)) {
        this.setState({ streak: DataShareService.getStatusLogStreak(this.props.habit.statusLog, moment()) });
        this.setState({ completions: DataShareService.getStatusLogCompletionsCount(this.props.habit.statusLog) });
        this.setState({ best: DataShareService.getStatusLogBestCount(this.props.habit.statusLog) })
      }
    }
    
    render() {  
      return (
        <View style={this.styles.container}>
          <HabitStat title={'Streak'} number={this.state.streak}/>
          <HabitStat title={'Completions'} number={this.state.completions}/>
          <HabitStat title={'Best'} number={this.state.best} />
        </View>     
      );
    }

    styles = StyleSheet.create({
      container: {
        height: 60,
        flex: 1,
        flexDirection: 'row',
      }
    });
}