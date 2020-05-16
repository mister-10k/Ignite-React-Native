import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import { ChartInfo, CardAction, ChartType } from "../shared/types";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import { DataShareService } from "../services/DataShare.service";

interface Props {
    chartInfo: ChartInfo;
    currentAction: string;
    changeCardTitle: (title: string) => void 
}

interface State {
    dateRangeLabel: string;
    chartData: Array<any>;
}

export class Chart extends React.Component<Props, State> {
    currentAction: string;
    monthsRange: Array<moment.Moment>;
    weekRanges: Array<{startOfWeek: moment.Moment, endOfWeek: moment.Moment}>;
    completionRateColorSwitcher: any = {
        fill: (data: any) => {
          let color = '#DC6788';
    
          if (data.index == 0) {
            color = '#67B7DC';
          }
          else if (data.index == 1) {
            color = '#6794DC';
          }
          else if (data.index == 2) {
            color = '#C767DC';
          }
          else {
            color = '#8067DC';
          }
    
          return color;
        }
      };

    constructor(props) {
      super(props);

      this.props.changeCardTitle(this.props.chartInfo.title);
      this.currentAction = this.props.currentAction;
      this.state = {
          dateRangeLabel: this.resetDateRangeLabel(),
          chartData: []
      };
    }

    componentDidMount() {
        this.setChartData();
    }

    componentDidUpdate(prevProps) {
        // marked dates updated
        if (this.props.chartInfo.habit && !DataShareService.sameStatusLogs(this.props.chartInfo.habit.statusLog, prevProps.chartInfo.habit.statusLog)) {
            this.setChartData();
        }

        if (prevProps.currentAction != this.props.currentAction) {
            this.currentAction = this.props.currentAction;
            this.setState({ dateRangeLabel: this.resetDateRangeLabel() });
            this.setChartData();
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
            const startDate = this.weekRanges[0].startOfWeek.subtract(1, 'days');
            this.decrementWeekRanges(startDate);

            const lbl = this.weekRanges[0].startOfWeek.format('MMM Do YYYY') + ' - ' + this.weekRanges[this.weekRanges.length - 1].endOfWeek.format('MMM Do YYYY');
            this.setState({ dateRangeLabel: lbl });
        } else {
            const startDate = this.monthsRange[0].subtract(1, 'days');
            this.decrementMonthRanges(startDate);

            const lbl = this.monthsRange[0].format('MMM YYYY') + ' - ' + this.monthsRange[this.monthsRange.length - 1].format('MMM YYYY');
            this.setState({ dateRangeLabel: lbl });
        }

        this.setChartData();
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

        this.setChartData();
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

    setChartData() {
        switch(this.props.chartInfo.chartType) { 
            case ChartType.CompletionRate: {
                if (this.currentAction == CardAction.Weekly) { 
                    this.setState({ chartData: DataShareService.getCompletionRatesByWeek(this.weekRanges, this.props.chartInfo.habit) })             
                } else {
                    this.setState({ chartData:  DataShareService.getCompletionRatesByMonth(this.monthsRange, this.props.chartInfo.habit) })
                }
            break; 
            } 
            default: { 
               break; 
            } 
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
            // <VictoryChart 
            //             width={Dimensions.get('window').width}
            //             animate={{duration: 200}}
            //         >
            //             <VictoryBar
            //                 data={this.state.chartData}
            //                 barWidth={40}
            //                 style={{ data: { ... this.completionRateColorSwitcher }, labels: { fill: 'grey' }, }}
            //                 labels={({ datum }) => {
            //                     return Math.round(datum.y) + '%'; //math.round is also used here for animation numbers
            //                 }}
            //             />
            //             <VictoryAxis style={{ axis: {stroke: "none"} }} />
            //             <VictoryAxis style={{ axis: {stroke: "none"}, tickLabels: { fill: "grey" } }}/>
            //         </VictoryChart>
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
        }
    });
}