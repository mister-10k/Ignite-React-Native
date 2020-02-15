import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";

interface BottomSheetHeaderProp {
    title: string;
    leftBtnName?: string;
    rightBtnName?: string;
    closeBottomSheet: () => void;
}

export class NoteBottomSheet extends React.Component<BottomSheetHeaderProp> {
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
                    <Text>{this.props.leftBtnName}</Text>
                </TouchableOpacity>

                <Text style={this.styles.title}>Note</Text>

                <TouchableOpacity style={this.styles.rightBtn} onPress={this.rightBtnClicked}>
                  <Text style={this.styles.rightBtnText}>{this.props.rightBtnName}</Text>
                </TouchableOpacity>
            </View>

            <View style={this.styles.body}><TextInput multiline style={{height: '100%', width: '100%'}}></TextInput></View>
          </View>
            
        );
    }

  styles = StyleSheet.create({
      container: {
        height: Dimensions.get('window').height * 0.91,
        marginTop: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft: 10,
        paddingRight: 10
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: 1,
        paddingBottom:10,
        borderColor: 'rgba(100,100,100,0.1)'
      },
      body: {

      },
      leftBtn: {
        marginLeft: 10
      },
      title: {
        fontWeight: 'bold'
      },
      rightBtn: {
        marginRight: 10
      },
      rightBtnText: {
        color: '#FD5C5F',
        fontWeight: 'bold'
      }
  });
}