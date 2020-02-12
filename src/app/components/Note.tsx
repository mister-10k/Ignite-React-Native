import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";
import moment from 'moment';

type DummyProp = {
}

export class Note extends React.Component<DummyProp> {
    render() {  
        return (
            <View style={{ backgroundColor: 'black', height: Dimensions.get('window').height}}></View>
        );
    }

  styles = StyleSheet.create({});
}