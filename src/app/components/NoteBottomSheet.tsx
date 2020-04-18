import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { DarkTheme } from "../shared/themes/Dark";

interface Props {
    title: string;
    leftBtnName?: string;
    rightBtnName?: string;
    closeBottomSheet: () => void;
}

export class NoteBottomSheet extends React.Component<Props> {
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

            <View style={this.styles.body}><TextInput multiline style={{height: '100%', width: '100%'}}></TextInput></View>
          </View>
            
        );
    }

  styles = StyleSheet.create({
      container: {
        height: Dimensions.get('window').height * 0.91,
        marginTop: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: DarkTheme.ACCENT_COLOR
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: 'rgba(100,100,100,0.1)',
        backgroundColor: DarkTheme.PRIMARY_COLOR
      },
      body: {
        paddingHorizontal: 10
      },
      leftBtn: {
        
      },
      leftBtnText: {
        fontSize: 16,
        color: DarkTheme.PRIMARY_TEXT_COLOR
      },
      title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: DarkTheme.PRIMARY_TEXT_COLOR
      },
      rightBtn: {
      },
      rightBtnText: {
        color: DarkTheme.PRIMARY_TEXT_COLOR,
        fontSize: 16
        // fontWeight: 'bold'
      }
  });
}