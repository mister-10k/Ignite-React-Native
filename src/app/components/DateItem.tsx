import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from "react-native";
import {
    format,
} from 'date-fns';
import ChineseLunar from 'chinese-lunar';
import { DarkTheme } from "../shared/themes/Dark";
const width = Dimensions.get('window').width;

interface Props  {
    item,
    marked,
    highlight,
    showLunar,
    onItemPress,
    color
}

interface State {

}

export class DateItem extends React.PureComponent<Props, State> {
  render() {  
    const {
        item,
        marked,
        highlight,
        showLunar,
        onItemPress,
      } = this.props;
      const solar = format(item, 'D');
      const _lunar = ChineseLunar.solarToLunar(item);
      const lunar = ChineseLunar.format(_lunar, 'd');
      const highlightBgColor = this.props.color;
      const normalBgColor = DarkTheme.PRIMARY_COLOR;
      const hightlightTextColor = '#fff';
      const normalTextColor = DarkTheme.PRIMARY_TEXT_COLOR;
      return (
        <View style={this.styles.itemContainer}>
          <TouchableOpacity
            //underlayColor='#008b8b'
            style={this.styles.itemWrapButton}
            onPress={onItemPress}
          >
            <View style={[
              this.styles.itemView,
              { paddingTop: showLunar ? 0 : 10 },
              {backgroundColor: highlight ? highlightBgColor : normalBgColor}
            ]}>
              <Text style={[
                this.styles.itemDateText,
                {color: highlight ? hightlightTextColor : normalTextColor}
              ]}>{solar}</Text>
              {showLunar &&
                <Text style={[
                  this.styles.itemLunarText,
                  {color: highlight ? hightlightTextColor : 'gray'}
                ]}>{lunar}</Text>
              }
              {marked &&
                <View style={[
                  this.styles.itemBottomDot,
                  {backgroundColor: highlight ? 'white' : '#6D88E6'}
                ]} />
              }
            </View>
          </TouchableOpacity>
        </View>
      );
  }

  styles = StyleSheet.create({
    header: {
      height: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    headerDate: {
      color: 'gray',
      fontSize: 13,
    },
    headerDateWeek: {
      color: '#3D6DCF',
      fontSize: 14,
    },
    headerGoTodayButton: {
      borderRadius: 10,
      width: 20, height: 20,
      backgroundColor: '#3D6DCF',
      position: 'absolute', top: 5, right: 50,
      justifyContent: 'center', alignItems: 'center',
    },
    todayText: {
      fontSize: 12,
      color: 'white',
    },
    itemContainer: {
      width: width / 7,
      height: 50,
    //   borderBottomWidth: 1,
    //   borderBottomColor: 'rgba(100,100,100,0.1)',
    },
    itemWrapButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemView: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 4,
      width: 44,
      height: 44,
      borderRadius: 22,
    },
    itemDateText: {
      fontSize: 15,
      lineHeight: Platform.OS === 'ios' ? 19 : 15,
    },
    itemLunarText: {
      fontSize: 10,
    },
    itemBottomDot: {
      width: 4,
      left: 20,
      height: 4,
      bottom: 4,
      borderRadius: 2,
      position: 'absolute',
    }
  });
}