import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HabitList } from "./HabitList";
import { CalendarStrip } from "./CalendarStrip";
import moment from 'moment';
import { DarkTheme } from "../shared/themes/Dark";
import * as Haptics from 'expo-haptics';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { HabitStats } from "./HabitStats";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Chart } from "./Chart";

LocaleConfig.locales['IG'] = {
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  monthNamesShort: ['Jan.','Feb.','Mar.','Apr.','Mai','Jun.','Jul.','Aug.','Sept.','Oct.','Nov.','Dec.'],
  dayNames: ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  dayNamesShort: ['S','M','T','W','T','F','S'],
  today: 'Today'
};
LocaleConfig.defaultLocale = 'IG';


interface Props {
  title: string;
  componentType: string;
  actions?: Array<string>;
  data?: any;
  paddingVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  navigation?;
  actionPressed?: (nextAction:string) => void;
  cb1?; // callback1 (optional)
  cb2?; // callback2 (optional)
  cb3?; // callbacl3 (optional)
}

interface State {
  title: string;
  selectedDate: string;
  currentAction: string;
}

export class Card extends React.Component<Props, State> {
  currentActionIndex = 0;

  constructor(props) {
    super(props);
    
    this.state = {
      title: this.props.title,
      selectedDate: moment().format('YYYY-MM-DD'),
      currentAction: this.props.actions && this.props.actions.length > 0 ? this.props.actions[0] : ''
    };
  }

  changeCardTitle = (title: string) => {
    this.setState({title: title});
  }

  onActionPress() {
    if (this.currentActionIndex != this.props.actions.length - 1) {
      this.currentActionIndex++;
    } else {
      this.currentActionIndex = 0;
    }

    this.setState({ currentAction: this.props.actions[this.currentActionIndex]});
  }

  render() {  
    return (
      <View style={this.styles.container}>
        <View style={this.styles.header}>
          <Text style={this.styles.title}>{this.state.title.toUpperCase()}</Text>
          {
            this.props.actions && this.props.actions.length == 1 &&
            <Text style={[this.styles.actionsText, {marginRight: 10, marginBottom: 5,}]}>{this.state.currentAction.toUpperCase()}</Text>
          }
          {
            this.props.actions && this.props.actions.length > 1 &&
            <TouchableOpacity
              style={this.styles.actions}
              onPress={() => {this.onActionPress()}}>
                <Text style={this.styles.actionsText}>{this.state.currentAction.toUpperCase()}</Text>
            </TouchableOpacity>
          }
        </View>
        <View style={this.styles.containerInner}>
          {this.factory()}
        </View>
      </View>
    );
  }

  factory() {
      switch (this.props.componentType) {
        case "calendarStrip":
          return <CalendarStrip
              getCurrentMonths={this.changeCardTitle}
              selectedDate={this.state.selectedDate}
              onPressDate={async (date) => {
                await Haptics.selectionAsync();
                this.props.cb1(moment(date));
                this.setState({ selectedDate: date });
              }}
              onPressGoToday={(today) => {
                this.setState({ selectedDate: today });
              }}
              onSwipeDown={() => {
                // alert('onSwipeDown');
              }}
              markedDate={['2018-05-04', '2018-05-15', '2018-06-04', '2018-05-01']}
            />
        case "habitList":
          return <HabitList selectedDate={this.props.data} navigation={this.props.navigation}/>;
        case 'calendar':
          return <CalendarList
                  onDayPress={async (day) => {await this.props.cb1(moment(day.dateString, 'YYYY-MM-DD'))}}
                  horizontal={true}
                  pagingEnabled={true}
                  markedDates={this.props.data.markedDates}
                  markingType={'period'}
                  // hideExtraDays={false}
                  // Specify theme properties to override specific styles for calendar parts. Default = {}
                  theme={{
                    backgroundColor: DarkTheme.PRIMARY_COLOR,
                    calendarBackground: DarkTheme.PRIMARY_COLOR,
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: this.props.data.color,
                    dayTextColor: 'white',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'grey',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: 'white',
                    indicatorColor: 'blue',
                    // textDayFontFamily: 'monospace',
                    // textMonthFontFamily: 'monospace',
                    // textDayHeaderFontFamily: 'monospace',
                    textDayFontWeight: '300',
                    textMonthFontWeight: '400',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16
                  }}
                />
        case 'chart':
          return <Chart 
                    chartInfo={this.props.data}
                    currentAction={this.state.currentAction}
                    changeCardTitle={this.changeCardTitle}
                    >
                 </Chart>
        default:
          return <View>Reload...</View>;
      }
    }

    styles = StyleSheet.create({
      container: {
        marginTop: this.props.marginTop != null ? this.props.marginTop : 30,
        marginBottom: this.props.marginBottom != null ? this.props.marginBottom : 30
      },
      containerInner: {
        paddingVertical: this.props.paddingVertical != null ? this.props.paddingVertical : 10,
        backgroundColor: DarkTheme.PRIMARY_COLOR,
        borderTopWidth: 1,
        borderTopColor: 'rgba(133,133,134,0.1)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(133,133,134,0.1)',
      },
      header: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
      },
      title: {
        marginLeft: 10,
        marginBottom: 5,
        color: 'grey'
      },
      actions: {
        marginRight: 10,
        marginBottom: 5,
      },
      actionsText: {
        color: this.props.actions && this.props.actions.length == 1 ? 'grey' : 'white'
      }
    });
  }