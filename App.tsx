import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import { HomeScreen } from './src/app/screens/HomeScreen';
import { HabitScreen } from './src/app/screens/HabitScreen';
import { SettingsScreen } from './src/app/screens/SettingsScreen';
import { StatsScreen } from './src/app/screens/StatsScreen';
import { BreadProvider } from "material-bread";

const AppNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Stats: { screen: StatsScreen },
    Settings: { screen: SettingsScreen }
  }
);

const NavStack = createStackNavigator({
  Tabs: {
    screen: AppNavigator,
    navigationOptions: {title: 'Ignite' }
  },
  Habit: { screen: HabitScreen }
});

const AppContainer = createAppContainer(NavStack);

export default class App extends React.Component {
  render() {  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
        <BreadProvider>
          <AppContainer/>
        </BreadProvider>
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
