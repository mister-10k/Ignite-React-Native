import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../components/Card";
import { ScrollView } from "react-native-gesture-handler";
import moment from 'moment';
import { DarkTheme } from "../shared/themes/Dark";

interface Props  {
}

interface State  {
  isLoading: boolean
}

export class HomeScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  getCalendarStripDefaultTitle() {
    const currentDate = moment();
    const startDate = currentDate.startOf('isoWeek');
    const endDate = currentDate.endOf('isoWeek');

    if (startDate.month() == endDate.month()) {
      return startDate.format('MMMM YYYY');
    } else {
      return startDate.format("MMM 'YY") + ' - ' + endDate.format("MMM 'YY");
    }
  }

  render() {  
        return ( 
            <View style={{backgroundColor: DarkTheme.ACCENT_COLOR}}>
              <ScrollView 
                bounces={false}
                showsVerticalScrollIndicator={false} >
                  <Card title={this.getCalendarStripDefaultTitle()} componentType={"calendar"} paddingVertical={0}/>
                  <Card title={"Habits"} componentType={"habitList"} paddingVertical={0}></Card>
              </ScrollView>     
            </View>
        );
  }
}