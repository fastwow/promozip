import React from 'react';
import {Icon} from 'react-native-elements';
import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Icon
      name={props.name}
      size={26}
      type="font-awesome"
      style={{marginBottom: -3}}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
