import React, {Component} from 'react';
import {Button, Text, Avatar, Icon, Card, Divider} from 'react-native-elements';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import AppStore from '../store/AppStore';

import Spinner from 'react-native-loading-spinner-overlay';

export default class SettingsScreen extends Component {
  store = AppStore;

  static navigationOptions = {
    title: 'Settings',
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  onLogout = () => {
    this.setState({isLoading: true});
    this.store.signOut();
    this.setState({isLoading: false});
  };

  render() {
    return (
      <LinearGradient
        style={{
          flex: 1,
        }}
        colors={['#1B1B1B', '#404040']}>
        <ScrollView>
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
              flex: 1,
              backgroundColor: 'white',
              marginTop: 24,
              margin: 12,
              borderRadius: 12,
            }}>
            <View style={{padding: 12}}>
              <Text style={{paddingTop: 6, paddingBottom: 16}}>
                Privacy Policy
              </Text>
              <Divider></Divider>
              <Text
                style={{paddingTop: 12, paddingBottom: 6}}
                onPress={this.onLogout}>
                Log Out
              </Text>
            </View>
          </View>
        </ScrollView>
        {this.state.isLoading && (
          <Spinner
            visible={this.state.isLoading}
            textStyle={{color: 'white'}}
          />
        )}
      </LinearGradient>
    );
  }
}
