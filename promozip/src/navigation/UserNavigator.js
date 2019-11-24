import React from 'react';
import {Platform, Settings} from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NewMatchScreen from '../screens/NewMatchScreen';
import LearningPlan from '../screens/LearningPlanScreen';
import WelcomePageScreen from '../screens/WelcomePageScreen';

const config = Platform.select({
  headerMode: 'none',
});

const HomeStack = createStackNavigator(
  {
    Welcome: WelcomePageScreen,
    Home: HomeScreen,
    NewMatch: NewMatchScreen,
    LearningPlan: LearningPlan,
  },
  config,
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Learning',
  tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name={'book'} />,
};

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    Settings: SettingsScreen,
  },
  config,
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name={'user'} />,
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ProfileStack,
});

tabNavigator.path = '';

export default createAppContainer(tabNavigator);
