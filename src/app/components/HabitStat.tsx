import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface Props {
  title: string;
  number: number;
}

interface State {
}

export class HabitStat extends React.Component<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
      };
    }
    
    render() {  
      return (
        <View style={this.styles.container}>
          <Text style={this.styles.number}>{this.props.number}</Text>
          <Text style={this.styles.title}>{this.props.title}</Text>
        </View>     
      );
    }

    styles = StyleSheet.create({
      container: {
        height: 50,
        width: 50,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
      },

      number: {
        fontSize: 30,
        color: 'white',
        fontWeight: '500'
      },

      title: {
        fontSize: 14,
        color: 'grey',
        // fontWeight: '400'
      }
    });
}