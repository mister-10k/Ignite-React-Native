import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Days } from "../shared/types";
import * as Haptics from 'expo-haptics';

interface Props {
    selected: boolean;
    dayId: Days;
    dayAbbreviation: string;
    leftMargin: boolean
    onDaySelect: (dayId: Days, selected: boolean) => void
}

interface State {
}

export class DayItem extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        
        this.state = {
            selected: this.props.selected
        };
    }

    pressed = async () => {
        await Haptics.selectionAsync();
        this.props.onDaySelect(this.props.dayId, !this.props.selected);
    }

    render() {  
        return (
            <TouchableOpacity 
                style={[
                    this.styles.container,
                    {backgroundColor: this.props.selected ? 'grey' : 'black'},
                    {marginLeft: this.props.leftMargin ? 10 : 0}
                ]}
                onPress={async () => {await this.pressed()}}>
                <Text style={this.styles.dayAbbreviation}>{this.props.dayAbbreviation}</Text>
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
        },
        dayAbbreviation: {
            marginTop: 6,
            color: 'white'
        }
    });
}