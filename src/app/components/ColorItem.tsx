import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { HabitColor } from "../shared/types";

interface Props {
    selected: boolean;
    colorId: HabitColor;
    leftMargin: boolean;
    onColorSelect: (colorId: HabitColor, selected: boolean) => void
}

interface State {
    selected: boolean;
}

export class ColorItem extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        
        this.state = {
            selected: this.props.selected
        };
    }

    pressed = () => {
        this.setState({selected: !this.state.selected});
        this.props.onColorSelect(this.props.colorId, this.state.selected);
    }

    render() {  
        return (
            <TouchableOpacity 
                style={[
                    this.styles.container,
                    {borderColor: this.state.selected ? 'white' : ''},
                    {borderWidth: this.state.selected ? 2 : 0},
                    {marginLeft: this.props.leftMargin ? 10 : 0}
                ]}
                onPress={this.pressed}>
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