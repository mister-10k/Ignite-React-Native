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
    navigation: NavigationScreenProp<any,any>
    route: RouteProp<any,any>
}

interface State {
  currentHabit: Habit;
  frequenciesAbbreviated: string;
}

export class AddEditHabitScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
          currentHabit: {
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
            streak: 0
          },
          frequenciesAbbreviated: ''
        };
    }

    componentDidMount() {
      this.props.navigation.setParams({ saveHabit: this.saveHabit });

      if (this.props.habit) {
        this.setState({ currentHabit: this.props.habit})
      }
      this.setDayAbbreviations();
    }

    setDayAbbreviations() {
      let abbreviations = '';
      this.state.currentHabit.frequency.forEach((f,index) => {
        let letter = '';
        if (f == Days.Sunday || f == Days.Saturday) {
          letter = 'S';
        } else if (f == Days.Monday) {
          letter = 'M'
        } else if (f == Days.Tuesday || f == Days.Thursday) {
          letter = 'T'
        } else if (f == Days.Wednesday) {
          letter = 'W'
        } else { // Friday
          letter = 'F'
        }


        if (index == 0) {
          abbreviations += letter;
        } else {
          abbreviations +=  ',' + letter;
        }
      });

      this.setState({frequenciesAbbreviated: abbreviations });
    }

    saveHabit() {
      alert('hi');
    }
      
    render() { 
        return (
            <View style={this.styles.container}>

              <View style={this.styles.row}>
                  <View style={this.styles.rowNameWrapper}><Text style={this.styles.rowName}>Habit Name</Text></View>
                  <View style={this.styles.rowBody}><TextInput style={this.styles.rowInput}/></View>
              </View>
              <View style={this.styles.row}>
                  <View style={this.styles.rowNameWrapper}><Text style={this.styles.rowName}>Frequency</Text></View>
                  <View style={{marginTop: 15}}><DaySelect/></View>
                  {/* <View style={this.styles.rowBody}><Text style={this.styles.rowInput}>{this.state.frequenciesAbbreviated}</Text></View> */}
              </View>
              <View style={this.styles.row}>
                  <View style={this.styles.rowNameWrapper}><Text style={this.styles.rowName}>Color</Text></View>
                  <View style={{marginTop: 15}}><ColorSelect/></View>
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
            color: DarkTheme.PRIMARY_TEXT_COLOR
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