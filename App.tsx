import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './src/app/screens/HomeScreen';
import { HabitScreen } from './src/app/screens/HabitScreen';
import { SettingsScreen } from './src/app/screens/SettingsScreen';
import { StatsScreen } from './src/app/screens/StatsScreen';
import { Icon } from 'react-native-vector-icons/Icon';

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
});

const StatsStack = createStackNavigator({
  Search: { screen: StatsScreen },
});

const SettingsStack = createStackNavigator({
  Profile: { screen: SettingsScreen },
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Stats: StatsStack,
    Settings: SettingsStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return <Icon
          name='home'
          color='#000000'
        />
        } else if (routeName === 'Stats') {
          return <Icon
          name='trending-up'
          color='#000000'
        />
        } else if (routeName === 'Settings') {
          return <Icon
          name='player-settings'
          color='#000000'
        />
        }
      },
    }),
    initialRouteName: 'Home',
  },
);

const doNotShowHeaderOption = {
  navigationOptions: {
    header: null,
  },
};

const Navigation = createStackNavigator({
  Tabs: {
    screen: TabNavigator,
    ...doNotShowHeaderOption,
  },
  Habit: { screen: HabitScreen }
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
