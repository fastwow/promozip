import React from 'react';
import {Platform} from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewMatchScreen from '../screens/NewMatchScreen';

const config = Platform.select({
  web: {headerMode: 'screen'},
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    NewMatch: NewMatchScreen,
  },
  config,
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Jobs',
  tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name={'comments'} />,
};

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
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
