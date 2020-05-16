import React from "react";
import { View, StyleSheet, Text, AsyncStorage, TouchableOpacity } from "react-native";
import { Habit, StatusLogType, StatusLog } from "../shared/types";
import { CheckBox } from 'react-native-elements';
import { DarkTheme } from "../shared/themes/Dark";
import moment from "moment";
import * as Haptics from 'expo-haptics';
import { DataShareService } from "../services/DataShare.service";


interface Props {
  habit: Habit;
  bottomDivider: boolean;
  checked: boolean;
  selectedDate: moment.Moment;
  navigation
}

interface HabitListDetailState {
  checked: boolean;
  streak: number
}

export class HabitListDetail extends React.Component<Props, HabitListDetailState> {
    hapticOptions = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false
    };


    constructor(props) {
      super(props);

      this.state = {
        checked: this.props.checked,
        streak: DataShareService.getHabitStreak(this.props.habit, this.props.selectedDate)
      };
    }

    componentDidUpdate(prevProps) {
      if (!DataShareService.sameStatusLogs(this.props.habit.statusLog, prevProps.habit.statusLog) || !prevProps.selectedDate.isSame(this.props.selectedDate, 'day')) {
        this.setState({streak: DataShareService.getHabitStreak(this.props.habit, this.props.selectedDate)});

        this.changeCheckedOnUpdate();
      }

      if (!prevProps.selectedDate.isSame(this.props.selectedDate, 'day')) {
        this.changeCheckedOnUpdate();
      }
    }

    changeCheckedOnUpdate() {
      const completedForDate = this.props.habit.statusLog.findIndex(x => this.props.selectedDate.isSame(moment(x.date), 'day') && x.type == StatusLogType.Complete) > -1;

      if (this.state.checked != completedForDate) {
        this.setState({checked: completedForDate});
      }
    }


   checkUnceck = async () => {
      await Haptics.selectionAsync();
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

      this.setState({streak: DataShareService.getHabitStreak(habits[index], this.props.selectedDate)});
      this.setState({checked: !this.state.checked})
    }

    render() {  
      return (
        <TouchableOpacity 
          style={this.styles.container}
          onPress={() => {
            this.props.navigation.navigate('Habit', {
              navigation: this.props.navigation,
              habitId: this.props.habit.id
            })
          }}
        >
            <View style={this.styles.checkBoxWrapper}>
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

            <View style={this.styles.habitNameStreakWrapper}>

                <View style={this.styles.habitNameWrapper}>
                    <Text style={this.styles.habitName} numberOfLines={1}>{this.props.habit.name}</Text>
                </View>

                <View style={this.styles.statusIconsWrapper}>
                    {
                      this.state.streak < 0 &&
                      <View style={this.styles.streakWrapper}>
                          <Text style={this.styles.streakNumber}>{Math.abs(this.state.streak)}</Text>
                          <Text style={this.styles.emoji}>😴</Text>
                      </View>
                    }
                    {
                      this.state.streak == 0 &&
                      <View></View>
                    }
                    {
                      this.state.streak > 0 &&
                      <View style={this.styles.streakWrapper}>
                        <Text style={[this.styles.streakNumber, {marginTop: 2}]}>{this.state.streak}</Text>
                        <Text style={this.styles.emoji}>🔥</Text>
                      </View> 
                    }     
                </View>

            </View>
        </TouchableOpacity>
      );
    }

      styles = StyleSheet.create({
          container: {
            height: 60,
            flex: 1,
            flexDirection: 'row',
            paddingRight: 10
          },

          habitNameStreakWrapper: {
            width: '88%',            
            borderBottomWidth: this.props.bottomDivider ? 1 : 0,
            borderColor: 'rgba(133,133,134,0.1)',
            flexDirection: 'row',
          },
          
          checkBoxWrapper: {
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
            flex: 1,
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'flex-end'
          },

          streakNumber: {
            // marginTop: 7,
            marginRight: 5,
            color: "#858586",
            fontSize: 16,
          },

          emoji: {
            fontSize: 16
          },

          habitNameWrapper: {
            flex: 1,
            justifyContent: 'center',
          },

          habitName : {
            // fontWeight: 'bold'
            color: DarkTheme.PRIMARY_TEXT_COLOR,
          },

          statusIconsWrapper: {
            flex: 0.2,
            flexDirection: 'row'
          }
      });
}