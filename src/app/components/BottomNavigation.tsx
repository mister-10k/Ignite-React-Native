import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationScreenProp } from "react-navigation";
import { Entypo, Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { AddEditHabitScreen } from "../screens/AddEditHabitScreen";
import { DarkTheme } from "../shared/themes/Dark";

interface Props {
    navigation,
    state
}

interface State {

}

export class BottomNavigation extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }
      
    render() {
        return (
            <View style={this.styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <Entypo name={'home'} size={30} color={this.props.state.index == 0 ? "white" : "grey"}></Entypo>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Stats')}>
                    <Ionicons name={'ios-stats'} size={30} color={this.props.state.index == 1 ? "white" : "grey"}></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEditHabit')}>
                    <MaterialIcons name={'add-box'} size={30} color="grey"></MaterialIcons>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Offers')}>
                    <MaterialCommunityIcons name={'sale'} size={30} color={this.props.state.index == 3 ? "white" : "grey"}></MaterialCommunityIcons>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
                    <MaterialIcons name={'settings'} size={30} color={this.props.state.index == 4 ? "white" : "grey"}></MaterialIcons>
                </TouchableOpacity>
            </View> 
        )
    }

    styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: DarkTheme.PRIMARY_COLOR,
            height: 40,
            paddingHorizontal: 30,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: 'rgba(133,133,134,0.1)'
        }
    });
  }