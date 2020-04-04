import React from "react";
import { View, StyleSheet, Text, AsyncStorage } from "react-native";
import { Habit, StatusLogType, StatusLog } from "../shared/types";
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { DarkTheme } from "../shared/themes/Dark";
import moment from "moment";

interface HabitListDetailProp {
  habit: Habit;
  bottomDivider: boolean;
  checked: boolean;
  selectedDate: moment.Moment;
}

interface HabitListDetailState {
  checked: boolean;
  streak: number
}


export class HabitListDetail extends React.Component<HabitListDetailProp, HabitListDetailState> {
    constructor(props) {
      super(props);

      this.state = {
        checked: this.props.checked,
        streak: this.getStatusLogStreak(this.props.habit.statusLog)
      };
    }

    componentDidUpdate(prevProps) {
      if (!prevProps.selectedDate.isSame(this.props.selectedDate, 'day')) {
        const completedForDate = this.props.habit.statusLog.findIndex(x => this.props.selectedDate.isSame(moment(x.date), 'day') && x.type == StatusLogType.Complete) > -1;

        if (this.state.checked != completedForDate) {
          this.setState({checked: completedForDate});
        }

        this.setState({streak: this.getStatusLogStreak(this.props.habit.statusLog)});

      }
    }

    // sameStatusLogs(sl1: Array<StatusLog>, sl2: Array<StatusLog>): boolean {
    //   if (sl1.length != sl2.length) {
    //     return false;
    //   }

    //   for (let i = 0; i < sl1.length; i++) {
    //     if (!(moment(sl1[i].date).isSame(moment(sl2[i].date), 'day') && sl1[i].type == sl2[i].type)) {
    //       return false;
    //     }
    //   }

    //   return true;
    // }

   checkUnceck = async () => {
      const newState = !this.state.checked;
      const habits = JSON.parse(await AsyncStorage.getItem('habits')) as Array<Habit>;
      const index = habits.findIndex(x => x.id == this.props.habit.id);

      if (newState) {
        habits[index].statusLog.push({ date: this.props.selectedDate, type: StatusLogType.Complete});
        habits[index].statusLog.sort((a, b) => moment(a.date).diff(moment(b.date)))
        await AsyncStorage.setItem('habits', JSON.stringify(habits));
      } else {
        const filteredDates = habits[index].statusLog.filter(x => !moment(x.date).isSame(this.props.selectedDate, 'day'));
        habits[index].statusLog = filteredDates.sort((a, b) => moment(a.date).diff(moment(b.date)));
        await AsyncStorage.setItem('habits', JSON.stringify(habits));
      }

      this.setState({streak: this.getStatusLogStreak(habits[index].statusLog)});
      this.setState({checked: !this.state.checked})
    }

    getStatusLogStreak(statusLog: Array<StatusLog>): number {
        if (statusLog.length == 0) {
          return 0;
        }

        const tempDate = moment(this.props.selectedDate);
        let streaking = statusLog.findIndex(x => moment(x.date).isSame(tempDate, 'day') && (x.type == StatusLogType.Complete || x.type == StatusLogType.Skip)) > -1;
        let streak = 0;

        if (streaking) {
          while (streaking) {
            streak++;
            tempDate.subtract(1, 'days');
            streaking = statusLog.findIndex(x => moment(x.date).isSame(tempDate, 'day') && (x.type == StatusLogType.Complete || x.type == StatusLogType.Skip)) > -1;
          }
        } else {
          const lowerDatedLogExists = statusLog.findIndex(x => moment(x.date).isBefore(tempDate)) > -1;
          while (!streaking && lowerDatedLogExists) {
            streak--;
            tempDate.subtract(1, 'days');
            streaking = statusLog.findIndex(x => moment(x.date).isSame(tempDate, 'day') && (x.type == StatusLogType.Complete || x.type == StatusLogType.Skip)) > -1;
          }
        }

        return streak;
    }

    render() {  
      return (
        <View style={this.styles.container}>
            <View style={this.styles.iconWrapper}>
              { this.state.checked && <View style={this.styles.checkedBackground}></View> }
              
              <CheckBox
                containerStyle={{position: 'absolute'}}
                // containerStyle={this.styles.checkBox}
                // wrapperStyle={this.styles.checkBox}
                checkedIcon='check-circle'
                uncheckedIcon='circle-thin'
                uncheckedColor='white'
                checkedColor={this.props.habit.color ? this.props.habit.color : "#858586"}
                checked={this.state.checked}
                onPress={async() => {await this.checkUnceck()}}
                size={30}
              />
            </View>

            <View style={this.styles.habitStatWrapper}>

                <View style={this.styles.habitNameWrapper}>
                    <Text style={this.styles.habitName}>{this.props.habit.name}</Text>
                </View>

                <View style={this.styles.statusIconsWrapper}>
                    {
                      this.state.streak < 0 &&
                      <View style={this.styles.streakWrapper}>
                          <View style={{marginTop: 3}}>
                            <MaterialCommunityIcons name="power-sleep" size={25} color="#858586" />
                          </View>

                          <Text style={this.styles.streakNumber}>{Math.abs(this.state.streak)}</Text>
                      </View>
                    }
                    {
                      this.state.streak == 0 &&
                      <View style={this.styles.iconWrapper}>
                          <Octicons name="dash" size={25} color="#858586" />
                      </View>
                    }
                    {
                      this.state.streak > 0 &&
                      <View style={this.styles.streakWrapper}>
                        <Ionicons name="md-flame" size={25} color="#CD5C5C" />
                        <Text style={this.styles.streakNumber}>{this.state.streak}</Text>
                      </View> 
                    }     
                </View>

            </View>
        </View>
      );
    }

      styles = StyleSheet.create({
          container: {
            height: 60,
            flex: 1,
            flexDirection: 'row'
          },

          habitStatWrapper: {
            width: '88%',
            borderBottomWidth: this.props.bottomDivider ? 1 : 0,
            borderColor: 'rgba(133,133,134,0.1)',
            flexDirection: 'row',
          },
          
          iconWrapper: {
            width: 50,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },

          checkedBackground: {
            height: 23,
            width: 23,
            backgroundColor: 'white',
            borderRadius: 16.5,
            marginRight: 2
          },

          streakWrapper: {
            flex: 0.5,
            flexDirection: 'row',
            alignSelf: 'center',
            width: 5
          },

          streakNumber: {
            marginTop: 7,
            marginLeft: 5,
            color: "#858586"
          },

          habitNameWrapper: {
            flex: 1,
            justifyContent: 'center',
          },

          habitName : {
            // fontWeight: 'bold'
            color: DarkTheme.PRIMARY_TEXT_COLOR
          },

          statusIconsWrapper: {
            flex: 0.2,
            flexDirection: 'row'
          }
      });
}