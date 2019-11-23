import React, {Component} from 'react';
import {Button, Text, Avatar, Icon} from 'react-native-elements';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import AppStore from '../store/AppStore';

export default class ProfileScreen extends Component {
  store = AppStore;

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Icon
          name="cog"
          size={24}
          containerStyle={{margin: 8}}
          type="font-awesome"
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
      ),
    };
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
              justifyContent: 'center',
              flex: 1,
              height: 160,
              backgroundColor: 'white',
              marginTop: 24,
              margin: 12,
              borderRadius: 12,
            }}>
            <View style={{padding: 12}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Avatar
                  containerStyle={{
                    marginRight: 10,
                    borderWidth: 1,
                    backgroundColor: 'white',
                    borderColor: 'grey',
                  }}
                  rounded
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/23.jpg',
                  }}
                  icon={{
                    name: 'user',
                    type: 'font-awesome',
                    size: 48,
                    color: '#2A84E8',
                  }}
                  size="large"
                />
                <View>
                  <Text
                    style={{fontSize: 18, fontWeight: 'bold', marginBottom: 5}}>
                    {this.store.user.firstname} {this.store.user.lastname}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}
