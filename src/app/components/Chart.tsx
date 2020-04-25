import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ChartInfo, CardAction, ChartType } from "../shared/types";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";

interface Props {
    chartInfo: ChartInfo;
    currentAction: string;
    changeCardTitle: (title: string) => void 
}

interface State {
    dateRangeLabel: string
}

export class Chart extends React.Component<Props, State> {
    currentAction: string;
    monthsRange: Array<moment.Moment>;
    weekRanges: Array<{startOfWeek: moment.Moment, endOfWeek: moment.Moment}>;

    constructor(props) {
      super(props);

      this.props.changeCardTitle(this.props.chartInfo.title);
      this.currentAction = this.props.currentAction;
      this.state = {
          dateRangeLabel: this.resetDateRangeLabel()
      };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentAction != this.props.currentAction) {
            this.currentAction = this.props.currentAction;
            this.setState({ dateRangeLabel: this.resetDateRangeLabel() });
        }
    }

    resetDateRangeLabel(): string {

        const startDate = moment();

        if (this.currentAction == CardAction.Weekly) {
            this.decrementWeekRanges(startDate);
            return this.weekRanges[0].startOfWeek.format('MMM Do YYYY') + ' - ' + this.weekRanges[this.weekRanges.length - 1].endOfWeek.format('MMM Do YYYY');
        } else { // for now monthly (all time  later)
            this.decrementMonthRanges(startDate);
            return this.monthsRange[0].format('MMM YYYY') + ' - ' + this.monthsRange[this.monthsRange.length - 1].format('MMM YYYY');
        }
    }
    decrementDateRange() {
        if (this.currentAction == CardAction.Weekly) {
            const startDate = this.weekRanges[0].startOfWeek.subtract(1, 'day');
            this.decrementWeekRanges(startDate);

            const lbl = this.weekRanges[0].startOfWeek.format('MMM Do YYYY') + ' - ' + this.weekRanges[this.weekRanges.length - 1].endOfWeek.format('MMM Do YYYY');
            this.setState({ dateRangeLabel: lbl });
        } else {
            const startDate = this.monthsRange[0].subtract(1, 'day');
            this.decrementMonthRanges(startDate);

            const lbl = this.monthsRange[0].format('MMM YYYY') + ' - ' + this.monthsRange[this.monthsRange.length - 1].format('MMM YYYY');
            this.setState({ dateRangeLabel: lbl });
        }
    }

    incrementDateRange() {
        if (this.currentAction == CardAction.Weekly) {
            const startDate = this.weekRanges[this.weekRanges.length - 1].endOfWeek.add(1, 'day');
            this.incrementWeekRanges(startDate);

            const lbl = this.weekRanges[0].startOfWeek.format('MMM Do YYYY') + ' - ' + this.weekRanges[this.weekRanges.length - 1].endOfWeek.format('MMM Do YYYY');
            this.setState({ dateRangeLabel: lbl });
        } else {
            const startDate = this.monthsRange[this.monthsRange.length - 1].add(1, 'month');
            this.incrementMonthRanges(startDate);

            const lbl = this.monthsRange[0].format('MMM YYYY') + ' - ' + this.monthsRange[this.monthsRange.length - 1].format('MMM YYYY');
            this.setState({ dateRangeLabel: lbl });
        }
    }

    decrementWeekRanges(startDate: moment.Moment) {
        this.weekRanges = [];

        while (this.weekRanges.length < 4) {
            const startOfWeek = moment(startDate.startOf('week'));
            const endOfWeek = moment(startDate.endOf('week'));
            this.weekRanges.push({ startOfWeek: startOfWeek, endOfWeek: endOfWeek});
            startDate.subtract(1, 'week');
        }

        this.weekRanges = this.weekRanges.reverse();
    }

    decrementMonthRanges(startDate: moment.Moment) {
        this.monthsRange = [];

        while (this.monthsRange.length < 4) {
            const startOfMonth = startDate.startOf('month');
            this.monthsRange.push(moment(startOfMonth));
            startDate.subtract(1, 'month');
        }

        this.monthsRange = this.monthsRange.reverse();
    }

    incrementWeekRanges(startDate: moment.Moment) {
        this.weekRanges = [];

        while (this.weekRanges.length < 4) {
            const startOfWeek = moment(startDate.startOf('week'));
            const endOfWeek = moment(startDate.endOf('week'));
            this.weekRanges.push({ startOfWeek: startOfWeek, endOfWeek: endOfWeek});
            startDate.add(1, 'week');
        }
    }

    incrementMonthRanges(startDate: moment.Moment) {
        this.monthsRange = [];

        while (this.monthsRange.length < 4) {
            const startOfMonth = startDate.startOf('month');
            this.monthsRange.push(moment(startOfMonth));
            startDate.add(1, 'month');
        }
    }
    
    render() {  
      return (
        <View style={this.styles.container}>
            <View style={this.styles.header}>
                <TouchableOpacity onPress={() => {this.decrementDateRange();}}>
                        <AntDesign size={20} color={'grey'} name={'left'}></AntDesign>
                </TouchableOpacity>
                
                <Text style={this.styles.dateRangeLabel}>{this.state.dateRangeLabel}</Text>

                <TouchableOpacity onPress={() => {this.incrementDateRange()}}>
                    <AntDesign size={20} color={'grey'} name={'right'}></AntDesign>
                </TouchableOpacity>
            </View>

            <View style={this.styles.chartContainer}>
                {this.factory()}
            </View>
        </View>     
      );
    }

    factory() {
        switch (this.props.chartInfo.chartType) {
          case ChartType.CompletionRate:
            return 
          default:
            return <View>Reload...</View>;
        }
      }

    styles = StyleSheet.create({
        container: {
            padding: 10
        },
        header: {
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 5
        },
        dateRangeLabel: {
            color: 'white'
        },
        chartContainer: {
            marginTop: 10
        }
    });
}