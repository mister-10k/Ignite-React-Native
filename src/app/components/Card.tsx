import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HabitList } from "./HabitList";
import { CalendarStrip } from "./CalendarStrip";
import moment from 'moment';

interface Props {
  title: string;
  componentType: string;
  data?: any;
  paddingVertical?: number;
}

interface State {
  title: string;
  selectedDate: string;
}

export class Card extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    
    this.state = {
      title: this.props.title,
      selectedDate: moment().format('YYYY-MM-DD')
    };
  }

  changeTitleFromChild = (title: string) => {
    this.setState({title: title});
  }

  render() {  
    return (
      <View style={this.styles.container}>
        <Text style={this.styles.title}>{this.state.title.toUpperCase()}</Text>
        <View style={this.styles.containerInner}>
          {this.factory()}
        </View>
      </View>
    );
  }

  factory() {
      switch (this.props.componentType) {
        case "calendar":
          return <CalendarStrip
              getCurrentMonths={this.changeTitleFromChild}
              selectedDate={this.state.selectedDate}
              onPressDate={(date) => {
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
          return <HabitList/>;
        default:
          return <View>Reload...</View>;
      }
    }

    styles = StyleSheet.create({
      container: {
        marginTop: 30
      },
      containerInner: {
        paddingVertical: this.props.paddingVertical != null ? this.props.paddingVertical : 10,
        backgroundColor: 'white'
      },
      title: {
        marginLeft: 10,
        marginBottom: 5,
        color: 'white'
      }
    });
  }