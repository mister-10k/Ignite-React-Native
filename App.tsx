import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import { HomeScreen } from './src/app/screens/HomeScreen';
import { HabitScreen } from './src/app/screens/HabitScreen';
import { SettingsScreen } from './src/app/screens/SettingsScreen';
import { StatsScreen } from './src/app/screens/StatsScreen';
import { Ionicons } from '@expo/vector-icons';

const AppNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen, navigationOptions: {title: 'Ignite' } },
    Stats: { screen: StatsScreen },
    Settings: { screen: SettingsScreen }
  },
  // {
  //   navigationOptions: ({ navigation }) => ({
  //     title: 'Ignite',
  //     tabBarIcon: () => {
  //       const { routeName } = navigation.state;
  //       let iconName =  '';
  //       if (routeName === 'Home') {
  //         iconName = 'home';
  //       } else if (routeName === 'Stats') {
  //         iconName = 'trending-up';
  //       } else if (routeName === 'Settings') {
  //         iconName='player-settings';
  //       }
  //       return <Ionicons name={iconName} color='#000000'/>
  //     },
  //   }),
  //   initialRouteName: 'Home'
  // },
);

// const doNotShowHeaderOption = {
//   navigationOptions: {
//     header: null,
//   },
// };

// const NavStack = createStackNavigator({
//   Tabs: {
//     screen: TabNavigator,
//     ...doNotShowHeaderOption,
//   },
//   Habit: { screen: HabitScreen }
// });

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
        <AppContainer/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
