import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

interface Prop {
    title: string;
    leftButton?: TouchableOpacity;
    rightButton?: TouchableOpacity;
}

interface State {
}

export class Header extends React.Component<Prop, State> {
    constructor(props) {
        super(props);
    }
      
    render() {  
        return (
        <View style={this.styles.container}>
            leftButton

            <Text style={this.styles.title}>{this.props.title}</Text>

            rightButton
        </View>
        );
    }

    styles = StyleSheet.create({
        container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderColor: 'rgba(100,100,100,0.1)'
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
          color: 'black',
          fontSize: 16
          // fontWeight: 'bold'
        }
    });
  }