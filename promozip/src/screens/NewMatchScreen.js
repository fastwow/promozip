import React, {Component} from 'react';
import {
  Button,
  AirbnbRating,
  Text,
  ListItem,
  Overlay,
} from 'react-native-elements';

import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import LinearGradient from 'react-native-linear-gradient';

import AppStore from '../store/AppStore';

import {observer} from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';

class NewMatchScreen extends Component {
  store = AppStore;

  static navigationOptions = ({navigation}) => ({
    title: 'New Test',
  });

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      selectSkills: [],
      skills: [],
      isSkillSelectionVisible: false,
      isLoading: false,
      review: '',
    };
  }

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
              flex: 1,
              backgroundColor: 'white',
              marginTop: 24,
              margin: 12,
              borderRadius: 12,
            }}>
            <View style={{padding: 12}}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 32,
                  marginBottom: 16,
                }}>
                Please enter your skills and job description you are want to
                check
              </Text>
            </View>
          </View>
        </ScrollView>
        <Button
          buttonStyle={{
            backgroundColor: '#fe824c',
            width: '100%',
            alignSelf: 'center',
            height: 50,
            borderRadius: 12,
          }}
          titleStyle={{color: 'white', fontWeight: 'bold'}}
          containerStyle={{margin: 16}}
          onPress={async () => {
            this.setState({isVisible: true, isLoading: true});
            await this.store.sendFeedbackToCandidate(
              this.props.navigation.getParam('id'),
              {skills: this.state.selectSkills, review: this.state.review},
            );
            this.setState({isVisible: true, isLoading: false});
          }}
          title="Submit"
        />
        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({isVisible: false})}
          height="auto">
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{padding: 10, fontSize: 20, fontWeight: 'bold'}}>
              Thank You!
            </Text>
            <Text style={{padding: 10, fontSize: 16}}>
              We have sent an email to the candidate. You will get feedback from
              the candidate after he receives yours
            </Text>
            <Button
              buttonStyle={{
                height: 50,
                backgroundColor: '#fe824c',
                borderRadius: 12,
              }}
              style={{padding: 10, width: 200}}
              title="OK"
              onPress={() => {
                this.props.navigation.pop();
                this.setState({isVisible: false});
              }}
            />
          </View>
        </Overlay>
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

export default observer(NewMatchScreen);
