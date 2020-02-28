import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import { HomeScreen } from './src/app/screens/HomeScreen';
import { HabitScreen } from './src/app/screens/HabitScreen';
import { SettingsScreen } from './src/app/screens/SettingsScreen';
import { StatsScreen } from './src/app/screens/StatsScreen';
import { OffersScreen } from './src/app/screens/OffersScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AddEditHabitScreen } from './src/app/screens/AddEditHabitScreen';
import { BottomNavigation } from './src/app/components/BottomNavigation';

// const AppNavigator = createBottomTabNavigator(
//   {
//     Home: { screen: HomeScreen },
//     Stats: { screen: StatsScreen },
//     // AddEditHabit: { screen: AddEditHabitScreen },
//     Offers: { screen: OffersScreen },
//     Settings: { screen: SettingsScreen }
//   },
//   {
//     tabBarComponent: props => <BottomNavigation {...props} />
//   },
// );

// const NavStack = createStackNavigator(
//   {
//     Tabs: {
//       screen: AppNavigator
//     },
//     AddEditHabit: { screen: AddEditHabitScreen }
//   },
//   {
//     defaultNavigationOptions: {
//       title: 'Ignite',
//     }
//   }
// );

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function Root() {
  return (
    <Tab.Navigator
      tabBar={props => <BottomNavigation {...props} />}
      initialRouteName={'Home'}
      tabBarOptions= {{
        activeTintColor: 'black'
      }}
    >
      <Tab.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Entypo name={'home'} size={size} color={color}></Entypo>
          ),
        }}
        />
      <Tab.Screen 
        name="Stats"
        component={StatsScreen} 
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={'ios-stats'} size={size} color={color}></Ionicons>
          ),
        }}
      />
      <Tab.Screen
        name="AddHabit"
        component={AddEditHabitScreen}
        options={{
          tabBarLabel: 'Add Habit',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={'add-box'} size={size} color={color}></MaterialIcons>
          ),
        }}
      />
      <Tab.Screen
        name="Offers"
        component={OffersScreen}
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name={'sale'} size={size} color={color}></MaterialCommunityIcons>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={'settings'} size={size} color={color}></MaterialIcons>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>          
          <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Ignite" component={Root} />
            <Stack.Screen name="AddEditHabit" component={AddEditHabitScreen} />
          </Stack.Navigator>
        </NavigationContainer>
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
