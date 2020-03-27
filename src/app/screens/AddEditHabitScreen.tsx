import React from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
import { Days, Habit } from "../shared/types";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationScreenProp } from "react-navigation";
import { RouteProp } from "@react-navigation/native";
import { DarkTheme } from "../shared/themes/Dark";
import { DaySelect } from "../components/DaySelect";
import { ColorSelect } from "../components/ColorSelect";

interface Props {
    title: string;
    habit?: Habit;
    navigation
    route: RouteProp<any,any>
}

interface State {
  habit: Habit;
}

export class AddEditHabitScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
          habit: {
            name: '',
            frequency: [
              Days.Sunday,
              Days.Monday,
              Days.Tuesday,
              Days.Wednesday,
              Days.Thursday,
              Days.Friday,
              Days.Saturday
            ],
            streak: 0,
            color: null
          }
        };

        this.props.navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={()=>{this.saveHabit()}} style={{marginRight: 10}}>
                <Text style={{color: 'white',fontWeight: 'bold', fontSize: 16}}>Save</Text>
            </TouchableOpacity>
          ),
        });

        if (this.props.habit) {
          this.setState({ habit: this.props.habit})
        }
    }

    onHabitNameChange = (name: string) => {
      const habit = { ...this.state.habit};
      habit.name = name;
      this.setState({ habit: habit});
    }

    onDaySelect = (frequency: Array<Days>) => {
      const habit = { ...this.state.habit};
      habit.frequency = frequency;
      this.setState({ habit: habit});
    }

    onColorSelect = (colorId: string) => {
      const habit = { ...this.state.habit};
      habit.color = colorId;
      this.setState({ habit: habit});
    }

    saveHabit() {
      if (this.state.habit.name == null || this.state.habit.name == '') {
        alert('Habit name is required.');
        return;
      }

      if (this.state.habit.frequency.length == 0) {
        alert('Please select at least one day for frequency.');
        return;
      }

      if (this.state.habit.color == null) {
        alert('Please select a color.')
      }
    }
      
    render() { 
        return (
            <View style={this.styles.container}>

              <View style={this.styles.row}>
                  {/* <View style={this.styles.rowNameWrapper}><Text style={this.styles.rowName}>Habit Name</Text></View> */}
                  <TextInput
                    placeholder={'Habit name'}
                    placeholderTextColor="grey"
                    onChangeText={(name) => {this.onHabitNameChange((name))}} style={this.styles.rowInput}/>
              </View>
              <View style={this.styles.row}>
                  <View style={this.styles.rowNameWrapper}><Text style={this.styles.rowName}>Frequency</Text></View>
                  <View style={{marginTop: 15}}><DaySelect onDaySelect={this.onDaySelect}/></View>
                  {/* <View style={this.styles.rowBody}><Text style={this.styles.rowInput}>{this.state.frequenciesAbbreviated}</Text></View> */}
              </View>
              <View style={this.styles.row}>
                  <View style={this.styles.rowNameWrapper}><Text style={this.styles.rowName}>Color</Text></View>
                  <View style={{marginTop: 15}}><ColorSelect onColorSelect={this.onColorSelect}/></View>
                  {/* <View style={this.styles.rowBody}><Text style={this.styles.rowInput}>{this.state.frequenciesAbbreviated}</Text></View> */}
              </View>

          </View>
        )
    }

    styles = StyleSheet.create({
        container: {
          // height: Dimensions.get('window').height * 0.91,
          paddingTop: 10,
          paddingHorizontal: 10
        },
        rowInput: {
            fontSize: 16,
            color: DarkTheme.PRIMARY_TEXT_COLOR,
            backgroundColor: '#1C1C1C',
            paddingHorizontal: 10,
            height: 40,
            borderRadius: 5
        },
        row: {
            flexDirection: 'column',
            marginBottom: 40
        },
        rowNameWrapper: {
            width: 120
        },
        rowName: {
            fontSize: 16,
            color: DarkTheme.PRIMARY_TEXT_COLOR
        },
        rowBody: {
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderColor: 'rgba(100,100,100,0.4)',
            width: '100%',
            minHeight: 40,
        }
    });
  }