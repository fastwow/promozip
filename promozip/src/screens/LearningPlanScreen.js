import React, {Component} from 'react';
import {Card, AirbnbRating} from 'react-native-elements';
import {View, Linking} from 'react-native';
import {Button, Text, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import AppStore from '../store/AppStore';

import Spinner from 'react-native-loading-spinner-overlay';

import {observer} from 'mobx-react';

class LearningPlanScreen extends Component {
  store = AppStore;

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
  });

  constructor(props) {
    super(props);

    this.state = {isLoading: false};
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    await this.store.loadLearningPlan(
      this.props.navigation.state.params.matchId,
    );
    this.setState({isLoading: false});
  }

  render() {
    return (
      <LinearGradient
        style={{
          flex: 1,
        }}
        colors={['#1B1B1B', '#404040']}>
        <ScrollView>
          <Text
            style={{
              paddingLeft: 16,
              paddingTop: 16,
              paddingRight: 16,
              color: 'white',
              fontWeight: 'bold',
              fontSize: 32,
              marginBottom: 16,
            }}>
            Learning Plan
          </Text>
          <View>
            {this.store.learningPlan.map((l, i) => (
              <Card
                key={l.id}
                containerStyle={{
                  borderRadius: 10,
                  borderColor: '#D8D8D8',
                  shadowRadius: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}>
                  <Avatar
                    containerStyle={{
                      marginRight: 10,
                      borderWidth: 1,
                      borderColor: 'grey',
                    }}
                    rounded
                    imageProps={{resizeMode: 'stretch'}}
                    source={{
                      uri: l.avatar,
                    }}
                    size="medium"
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 5,
                      }}>
                      {l.name}
                    </Text>
                    <Text style={{fontSize: 16}}>{l.details}</Text>
                  </View>
                </View>
                <Button
                  buttonStyle={{
                    backgroundColor: '#fe824c',
                    borderRadius: 12,
                    height: 50,
                  }}
                  onPress={() => {
                    Linking.canOpenURL(l.url).then(supported => {
                      if (supported) {
                        Linking.openURL(l.url);
                      } else {
                        console.log("Don't know how to open URI: " + l.url);
                      }
                    });
                  }}
                  titleStyle={{color: 'white', fontWeight: 'bold'}}
                  icon={
                    <Icon
                      name={
                        l.action === 'order'
                          ? 'shopping-cart'
                          : l.action === 'watch'
                          ? 'play'
                          : 'bookmark'
                      }
                      type="font-awesome"
                      size={24}
                      color="white"
                    />
                  }
                  title={
                    l.action === 'order'
                      ? ' Order'
                      : l.action === 'watch'
                      ? ' Watch'
                      : ' Apply'
                  }
                />
              </Card>
            ))}
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

export default observer(LearningPlanScreen);
