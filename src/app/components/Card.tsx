import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CardProp } from "../types";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { HabitList } from "./HabitList";

export class Card extends React.Component<CardProp> {
    render() {  
      return (
        <View style={this.styles.container}>
          <Text style={this.styles.title}>{this.props.title.toUpperCase()}</Text>
          <View style={this.styles.containerInner}>
            {this.factory()}
          </View>
        </View>
      );
    }

    factory() {
        switch (this.props.componentType) {
          case "calendar":
            return <Calendar/>;
          case "habitList":
            return <HabitList/>;
          default:
            return <View>Reload...</View>;
        }
      }

      styles = StyleSheet.create({
        container: {
          marginTop: 20
        },
        containerInner: {
          borderWidth: 0.5,
          borderColor: '#3D3D40',
          paddingTop: 10,
          paddingBottom: 10
        },
        title: {
          color: '#3D3D40',
          marginLeft: 10,
          marginBottom: 5
        }
      });
  }