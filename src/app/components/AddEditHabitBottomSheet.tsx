import React from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";

interface AddEditHabitBottomSheetProp {
    title: string;
    leftBtnName?: string;
    rightBtnName?: string;
    closeBottomSheet: () => void;
}

export class AddEditHabitBottomSheet extends React.Component<AddEditHabitBottomSheetProp> {
    constructor(props) {
        super(props);
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
                    <View style={this.styles.rowBody}><Text>Every day</Text></View>
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