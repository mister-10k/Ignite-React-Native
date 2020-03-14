import React from "react";
import { View, Text } from "react-native";

interface Props  {
}

interface State {

}

export class SettingsScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }
      
    render() {  
      return (
        <View>
          <Text>Welcome to settings.</Text>
        </View>
      );
    }
  }