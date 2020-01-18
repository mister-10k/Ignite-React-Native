import React from "react";
import { View } from "react-native";

type BottomNavIconProp = {
    iconName: string
}

export class BottomNavIcon extends React.Component<BottomNavIconProp> {
    constructor(props) {
        super(props);
    }
      
    render() {  
        if (this.props.iconName == 'Home') {
            return (
                <View></View>
              );
        } else if (this.props.iconName == 'Stats') {
            return (
                <View></View>
              );
        } else { // Settings
            return (
                <View></View>
              );
        }
    }
  }