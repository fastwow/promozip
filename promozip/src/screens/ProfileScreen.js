import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import AppStore from '../store/AppStore';

import {observer} from 'mobx-react';

class ProfileScreen extends Component {
  store = AppStore;

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Text>Profile</Text>
      </SafeAreaView>
    );
  }
}

export default observer(ProfileScreen);
