import React from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity, Text, TextInput, TouchableHighlightComponent } from "react-native";
import { Days, Habit } from "../shared/types";
import { NavigationScreenProp } from "react-navigation";

interface Prop {
    title: string;
    leftBtnName?: string;
    rightBtnName?: string;
    habit?: Habit;
    closeBottomSheet: () => void;
}

interface State {
  currentHabit: Habit;
  frequenciesAbbreviated: string;
}

export class AddEditHabitBottomSheet extends React.Component<Prop, State> {
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

    rightBtnClicked() {

    }

    closeBottomSheet = () => {
        this.props.closeBottomSheet();
    }
      
    render() { 
        return (
            <View style={this.styles.container}>
            <View style={this.styles.headerContainer}>
                <TouchableOpacity style={this.styles.leftBtn} onPress={this.closeBottomSheet}>
                    <Text style={this.styles.leftBtnText}>{this.props.leftBtnName}</Text>
                </TouchableOpacity>

                <Text style={this.styles.title}>{this.props.title}</Text>

                <TouchableOpacity style={this.styles.rightBtn} onPress={this.rightBtnClicked}>
                  <Text style={this.styles.rightBtnText}>{this.props.rightBtnName}</Text>
                </TouchableOpacity>
            </View>

            <View style={this.styles.body}>
                <View style={this.styles.row}>
                    <View style={this.styles.rowNameWrapper}><Text style={this.styles.rowName}>Habit Name</Text></View>
                    <View style={this.styles.rowBody}><TextInput style={this.styles.rowInput}/></View>
                </View>
                <View style={this.styles.row}>
                    <View style={this.styles.rowNameWrapper}><Text style={this.styles.rowName}>Frequency</Text></View>
                    <View style={this.styles.rowBody}><Text>{this.state.frequenciesAbbreviated}</Text></View>
                </View>
            </View>
          </View>
        )
    }

    styles = StyleSheet.create({
        container: {
          height: Dimensions.get('window').height * 0.91,
          marginTop: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10
        },
        headerContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomWidth: 1,
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderColor: 'rgba(100,100,100,0.1)'
        },
        body: {
          paddingHorizontal: 10
        },
        leftBtn: {
  
        },
        leftBtnText: {
          fontSize: 16
        },
        title: {
          fontWeight: 'bold',
          fontSize: 16
        },
        rightBtn: {
        },
        rightBtnText: {
          color: '#FD5C5F',
          fontSize: 16
          // fontWeight: 'bold'
        },
        rowInput: {
            fontSize: 16,
            color: 'black'
        },
        row: {
            alignItems: 'center',
            flexDirection: 'row',
            height: 50
        },
        rowNameWrapper: {
            width: 120
        },
        rowName: {
            fontSize: 16
        },
        rowBody: {
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderColor: 'rgba(100,100,100,0.1)',
            width: Dimensions.get('window').width - 140,
            height: '100%'
        }
    });
  }