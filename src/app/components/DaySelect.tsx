import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { DayItem } from "./DayItem";
import { Days } from "../shared/types";

interface Props {
}

interface State {
    days: Array<{id: Days, dayAbbreviation: string, selected: boolean}>
}

export class DaySelect extends React.Component<Props, State> {    
    constructor(props) {
        super(props);
        
        this.state = {
            days: [
                { id: Days.Sunday, dayAbbreviation: 'S', selected: true},
                { id: Days.Monday, dayAbbreviation: 'M', selected: true},
                { id: Days.Tuesday, dayAbbreviation: 'T', selected: true},
                { id: Days.Wednesday, dayAbbreviation: 'W', selected: true},
                { id: Days.Thursday, dayAbbreviation: 'T', selected: true},
                { id: Days.Friday, dayAbbreviation: 'F', selected: true},
                { id: Days.Saturday, dayAbbreviation: 'S', selected: true}
            ]
        };
    }

    onDaySelect = (dayId: Days, selected: boolean) => {
        console.log(dayId, selected);
    }

    render() {  
        return (
            <FlatList
                horizontal
                keyExtractor={(item) => item.id.toString()}
                data={this.state.days}
                renderItem={({ item, index }) => (
                    <DayItem
                        leftMargin={index != 0}
                        onDaySelect={this.onDaySelect}
                        selected={item.selected}
                        dayId={item.id}
                        dayAbbreviation={item.dayAbbreviation}
                    />
                )}
            />
        );
    }

    styles = StyleSheet.create({
    });
}