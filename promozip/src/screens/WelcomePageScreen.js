import React from 'react';
import {Text, SafeAreaView, View, ImageBackground} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: '1',
    title: 'Master your missed skills',
    image: require('../../image/onboarding_classes.png'),
  },
  {
    key: '2',
    title: 'Grow your own career',
    image: require('../../image/onboarding_career.png'),
  },
];

export default class WelcomePageScreen extends React.Component {
  _renderItem = ({item}) => {
    return (
      <ImageBackground
        source={item.image}
        blurRadius={3}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <SafeAreaView
          style={{
            flex: 1,
          }}>
          <View
            style={{
              alignContent: 'center',
              position: 'absolute',
              bottom: 160,
              left: 0,
              right: 0,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                fontSize: 28,
                fontWeight: 'bold',
              }}>
              {item.title}
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  };
  _onDone = () => {
    this.props.navigation.navigate('Home');
  };

  onSkip = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <AppIntroSlider
          renderItem={this._renderItem}
          slides={slides}
          doneLabel="Get Started"
          onDone={this._onDone}
          onSkip={this.onSkip}
          onSlideChange={this.onSlideChange}
          showSkipButton={true}
          // bottomButton
          buttonStyle={{
            borderWidth: 1,
            borderColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#a3a3a3C9',
            borderRadius: 24,
          }}
        />
        <Text
          style={{
            color: 'white',
            alignSelf: 'center',
            fontSize: 32,
            position: 'absolute',
            top: 80,
            fontWeight: 'bold',
          }}>
          Promozip
        </Text>
      </View>
    );
  }
}
