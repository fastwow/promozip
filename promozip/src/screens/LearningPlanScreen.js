import React, {Component} from 'react';
import {observer} from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';

class LearningPlanScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
  });

  render() {
    return (
      <LinearGradient
        style={{
          flex: 1,
        }}
        colors={['#1B1B1B', '#404040']}>
        <ScrollView></ScrollView>
      </LinearGradient>
    );
  }
}

export default observer(LearningPlanScreen);
