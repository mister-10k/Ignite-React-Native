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
          marginTop: 30
        },
        containerInner: {
          paddingVertical: this.props.paddingVertical != null ? this.props.paddingVertical : 10,
          backgroundColor: 'white'
        },
        title: {
          marginLeft: 10,
          marginBottom: 5
        }
      });
  }