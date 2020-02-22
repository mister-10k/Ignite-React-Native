import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationScreenProp } from "react-navigation";
import { Entypo, Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { AddEditHabitBottomSheet } from "./AddEditHabitBottomSheet";

interface BottomNavigationProp {
    navigation: NavigationScreenProp<any,any>

}

export class BottomNavigation extends React.Component<BottomNavigationProp> {
    RBSheet: RBSheet;
    
    constructor(props) {
        super(props);
    }
    closeBottomSheet = () => {
        this.RBSheet.close();
    }
      
    render() {
        let currentRouteName = this.props.navigation.state.routes[this.props.navigation.state.index].key;
        return (
            <View style={this.styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <Entypo name={'home'} size={30} color="grey"></Entypo>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Stats')}>
                    <Ionicons name={'ios-stats'} size={30} color="grey"></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.RBSheet.open()}>
                    <MaterialIcons name={'add-box'} size={30} color="grey"></MaterialIcons>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Offers')}>
                    <MaterialCommunityIcons name={'sale'} size={30} color="grey"></MaterialCommunityIcons>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
                    <MaterialIcons name={'settings'} size={30} color="grey"></MaterialIcons>
                </TouchableOpacity>

                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    closeOnDragDown
                    height={Dimensions.get('window').height * 0.95}
                    duration={250}
                    customStyles={{
                        container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        marginTop: 40
                        // position: 'absolute',
                        // top: 50
                        },
                        draggableIcon: { display: 'none'}
                    }}
                >
                    <AddEditHabitBottomSheet 
                        leftBtnName={'Cancel'}
                        title={'Add Habit'}
                        rightBtnName={'Add'}
                        closeBottomSheet={this.closeBottomSheet}
                    />
                </RBSheet>
            </View> 
        )
    }

    styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            height: 40,
            paddingHorizontal: 30,
            paddingTop: 10
        }
    });
  }