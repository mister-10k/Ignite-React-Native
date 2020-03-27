import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { HabitColor } from "../shared/types";
import { ColorItem } from "./ColorItem";

interface Props {
    onColorSelect: (colorId: HabitColor) => void
}

interface State {
    colors: Array<{id: HabitColor, selected: boolean}>
}

export class ColorSelect extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        
        this.state = {
            colors: [
                {id: HabitColor.SoftPink, selected: false},
                {id: HabitColor.SoftBlue, selected: false},
                {id: HabitColor.SoftBlue2, selected: false},
                {id: HabitColor.SoftBlue3, selected: false},
                {id: HabitColor.SoftViolet, selected: false},
                {id: HabitColor.SoftMagenta, selected: false},
                {id: HabitColor.SoftMagenta2, selected: false}
            ]       
        };
    }

    onColorSelect = (colorId: string, selected: boolean) => {
        const colors = [...this.state.colors];
        colors.forEach(color => {
            if (color.id == colorId) {
                color.selected = selected;

                if (color.selected) {
                    this.props.onColorSelect(color.id);
                } else {
                    this.props.onColorSelect(null);
                }
            } else {
                color.selected = false;
            }
        });
        this.setState({colors: colors});
    }

    render() {  
        return (
            <FlatList
                scrollEnabled={false}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                data={this.state.colors}
                renderItem={({ item, index }) => (
                    <ColorItem
                        leftMargin={index != 0}
                        onColorSelect={this.onColorSelect}
                        selected={item.selected}
                        colorId={item.id}
                    />
                )}
            />
        );
    }

    styles = StyleSheet.create({
    });
}