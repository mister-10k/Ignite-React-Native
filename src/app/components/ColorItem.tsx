import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { HabitColor } from "../shared/types";
import * as Haptics from 'expo-haptics';

interface Props {
    selected: boolean;
    colorId: HabitColor;
    leftMargin: boolean;
    onColorSelect: (colorId: HabitColor, selected: boolean) => void
}

interface State {
}

export class ColorItem extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    pressed = async () => {
        await Haptics.selectionAsync();
        this.props.onColorSelect(this.props.colorId, !this.props.selected);
    }

    render() {  
        return (
            <TouchableOpacity 
                style={[
                    this.styles.container,
                    {borderColor: this.props.selected ? 'white' : ''},
                    {borderWidth: this.props.selected ? 2 : 0},
                    {marginLeft: this.props.leftMargin ? 10 : 0}
                ]}
                onPress={async () => { await this.pressed()}}>
            </TouchableOpacity>
        );
    }

    styles = StyleSheet.create({
        container: {
            display: 'flex',
            alignItems: 'center',
            width: 30,
            height: 30,
            borderRadius: 30/2,
            backgroundColor: this.props.colorId
        },
        dayAbbreviation: {
            marginTop: 6,
            color: 'white'
        }
    });
}