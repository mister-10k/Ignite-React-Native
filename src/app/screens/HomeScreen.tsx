import React from "react";
import { View, Text } from "react-native";
import { Card } from "../components/Card";
import { ScrollView } from "react-native-gesture-handler";
import moment from 'moment';

type DummyProp = {
    msg: string
}

export class HomeScreen extends React.Component<DummyProp> {
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
      <ScrollView>
        <Card title={this.getCalendarStripDefaultTitle()} componentType={"calendar"} paddingVertical={0}/>
        <Card title={"Habits"} componentType={"habitList"} paddingVertical={0}></Card>
      </ScrollView>
    );
  }
}