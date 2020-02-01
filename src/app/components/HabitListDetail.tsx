import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Habit } from "../shared/types";
import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';

export interface HabitListDetailProp {
  habit: Habit;
  bottomDivider: boolean;
}

export class HabitListDetail extends React.Component<HabitListDetailProp> {
    render() {  
      return (
        <View style={this.styles.container}>
            <View style={this.styles.iconWrapper}>
            <CheckBox
              checkedIcon='check-circle'
              uncheckedIcon='circle-thin'
              checkedColor='#FD5C5F'
              checked={true}
              onPress={() => {}}
              size={30}
            />
            </View>

            <View style={this.styles.habitStatWrapper}>

                <View style={this.styles.habitNameWrapper}>
                    <Text style={this.styles.habitName}>{this.props.habit.name}</Text>
                </View>

                <View style={this.styles.statusIconsWrapper}>
                    {/* <View style={this.styles.iconWrapper}>
                        <MaterialCommunityIcons name="sleep" size={25} color="#858586" />
                    </View> */}
                    <View style={this.styles.streakWrapper}>
                        <Ionicons name="md-flame" size={25} color="#858586" />
                        <Text style={this.styles.streakNumber}>{this.props.habit.streak}</Text>
                    </View>  
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
            borderColor: 'rgba(100,100,100,0.1)',
            flexDirection: 'row',
          },
          
          iconWrapper: {
            width: '22%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
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
          },

          statusIconsWrapper: {
            flex: 0.2,
            flexDirection: 'row'
          },
      });
}