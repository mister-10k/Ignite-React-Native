import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import moment from 'moment';

interface BottomSheetHeaderProp {
    title: string;
    leftBtnName?: string;
    rightBtnName?: string;
}

export class BottomSheetHeader extends React.Component<BottomSheetHeaderProp> {
    leftBtnClicked() {

    }

    rightBtnClicked() {

    }

    render() {  
        return (
            <View style={this.styles.container}>
                <TouchableOpacity style={this.styles.leftBtn} onPress={this.leftBtnClicked}>
                    <Text>{this.props.leftBtnName}</Text>
                </TouchableOpacity>

                <Text>Note</Text>

                <TouchableOpacity style={this.styles.rightBtn} onPress={this.rightBtnClicked}>
                <Text>{this.props.rightBtnName}</Text>
                </TouchableOpacity>
            </View>
        );
    }

  styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      leftBtn: {
        marginLeft: 5
      },
      rightBtn: {
        marginRight: 5,
        color: '#FD5C5F',
        fontWeight: 'bold'
      }
  });
}