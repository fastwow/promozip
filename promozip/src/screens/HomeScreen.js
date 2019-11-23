import React, {Component} from 'react';
import {Card} from 'react-native-elements';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';
import AppStore from '../store/AppStore';

import Spinner from 'react-native-loading-spinner-overlay';

import {observer} from 'mobx-react';

class HomeScreen extends Component {
  store = AppStore;

  constructor(props) {
    super(props);

    this.state = {isLoading: false};
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    await this.store.loadJobPostList();
    this.setState({isLoading: false});
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <LinearGradient
          style={{
            height: '50%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
          colors={['#1B1B1B', '#404040']}
        />
        <ScrollView>
          <View
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              fontSize: 32,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 32,
                paddingTop: 16,
              }}>
              Learning plan
            </Text>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                paddingTop: 16,
                marginBottom: 16,
              }}>
              Job positions which you're interested in
            </Text>
          </View>
          <View>
            {this.store.jobPostList.map(({id, title}, i) => (
              <Card
                key={id}
                containerStyle={{
                  borderRadius: 10,
                  borderColor: '#D8D8D8',
                  shadowRadius: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 16,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          marginBottom: 5,
                        }}>
                        {title}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 5,
                          flex: 1,
                          alignItems: 'center',
                        }}></View>
                    </View>
                  </View>
                </View>
                <Button
                  buttonStyle={{
                    backgroundColor: '#fe824c',
                    borderRadius: 12,
                    height: 50,
                  }}
                  titleStyle={{color: 'white', fontWeight: 'bold'}}
                  onPress={() => {
                    this.props.navigation.navigate('LearningPlan', {
                      title: title,
                      id,
                    });
                  }}
                  icon={
                    <Icon
                      name="check"
                      type="font-awesome"
                      size={24}
                      color="white"
                    />
                  }
                  title=" Learning plan"
                />
              </Card>
            ))}
          </View>
        </ScrollView>
        <Button
          buttonStyle={{
            backgroundColor: 'white',
            width: '100%',
            alignSelf: 'center',
            height: 50,
            borderColor: '#404040',
            borderWidth: 1,
            borderRadius: 12,
          }}
          titleStyle={{color: '#404040', fontWeight: 'bold'}}
          onPress={() => {
            this.props.navigation.navigate('NewMatch');
          }}
          containerStyle={{margin: 16}}
          title="New Check"
        />
        {this.state.isLoading && (
          <Spinner
            visible={this.state.isLoading}
            textStyle={{color: 'white'}}
          />
        )}
      </SafeAreaView>
    );
  }
}

export default observer(HomeScreen);
