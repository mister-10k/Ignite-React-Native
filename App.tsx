import React from 'react';
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import { createAppContainer, SafeAreaView, NavigationScreenProp } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, StatusBar, Button, Dimensions, AsyncStorage } from 'react-native';
import { HomeScreen } from './src/app/screens/HomeScreen';
import { HabitScreen } from './src/app/screens/HabitScreen';
import { SettingsScreen } from './src/app/screens/SettingsScreen';
import { StatsScreen } from './src/app/screens/StatsScreen';
import { OffersScreen } from './src/app/screens/OffersScreen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AddEditHabitScreen } from './src/app/screens/AddEditHabitScreen';
import { BottomNavigation } from './src/app/components/BottomNavigation';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { DarkTheme } from './src/app/shared/themes/Dark';

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

headerAddEditHabit: ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Header
      title={title}
      leftButton={
        <TouchableOpacity onPress={() => {navigation.goBack}} style={{marginLeft: 10}}>
          <Text style={{color: 'black', fontSize: 16}}>Cancel</Text>
        </TouchableOpacity>
      }
      // style={options.headerStyle}
    />
  );
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

interface Prop  {
}

interface State  {
  navigationIndex: number
}

export default class App extends React.Component<Prop, State> {
  theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'black',
      text: 'white',
      border: 'rgba(133,133,134,0.1)',
      card: DarkTheme.PRIMARY_COLOR,
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      navigationIndex: 0
    };
  }

  getColorOfBottomOfSafeAreaView(): string {
    if (this.state.navigationIndex == 0) {
      return DarkTheme.PRIMARY_COLOR;
    }
    else {
      return DarkTheme.ACCENT_COLOR;
    }
  }

  render() { 
    return (
      // <SafeAreaView style={{ flex: 1, backgroundColor: DarkTheme.PRIMARY_COLOR}}>
      <SafeAreaView forceInset={{ top: 'never'}} style={{ flex: 1, backgroundColor: this.getColorOfBottomOfSafeAreaView()}}>
          <NavigationContainer 
            onStateChange={(newState) => {
              if (newState.index != this.state.navigationIndex) {
                this.setState({ navigationIndex: newState.index });
              }
            }} 
            theme={this.theme}>
            <Stack.Navigator>
              <Stack.Screen name="Ignite" component={Root} />
              <Stack.Screen
                name="AddEditHabit"
                component={AddEditHabitScreen}
                options={({navigation, route}) => ({
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                    gestureDirection: 'vertical',
                    // gestureResponseDistance: { horizontal: 25, vertical: Dimensions.get('window').height},
                    // safeAreaInsets: { bottom: 20},
                    title: 'Add Habit',
                    headerLeft: () => {
                      return (
                        <TouchableOpacity onPress={() => {navigation.goBack()}} style={{marginLeft: 10}}>
                          <Text style={{color: 'white', fontSize: 16}}>Cancel</Text>
                        </TouchableOpacity>
                      )
                    },
                })}
              />
              <Stack.Screen
                name="Habit"
                component={HabitScreen}
                options={({navigation, route}) => ({
                })}
              />
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
