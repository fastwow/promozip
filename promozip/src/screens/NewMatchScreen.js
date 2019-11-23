import React, {Component} from 'react';
import {
  Button,
  AirbnbRating,
  Text,
  ListItem,
  Overlay,
} from 'react-native-elements';

import TagInput from 'react-native-tag-input';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import LinearGradient from 'react-native-linear-gradient';

import AppStore from '../store/AppStore';

import {observer} from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';

const inputProps = {
  keyboardType: 'default',
  placeholder: 'email',
  autoFocus: true,
  style: {
    fontSize: 14,
    marginVertical: Platform.OS == 'ios' ? 10 : -2,
  },
};

const horizontalInputProps = {
  keyboardType: 'default',
  returnKeyType: 'search',
  placeholder: 'Search',
  style: {
    fontSize: 14,
    marginVertical: Platform.OS == 'ios' ? 10 : -2,
  },
};

const horizontalScrollViewProps = {
  horizontal: true,
  showsHorizontalScrollIndicator: false,
};

class NewMatchScreen extends Component {
  store = AppStore;

  static navigationOptions = ({navigation}) => ({
    title: 'New Test',
  });

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      skills: [],
      text: '',
      isLoading: false,
      review: '',
      tags: [],
      text: '',
      horizontalTags: [],
      horizontalText: '',
    };
  }

  labelExtractor = tag => tag;

  onChangeHorizontalTags = horizontalTags => {
    this.setState({
      horizontalTags,
    });
  };

  onChangeTags = tags => {
    this.setState({tags});
  };

  onChangeText = text => {
    this.setState({text});

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', ' ', ';', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      this.setState({
        tags: [...this.state.tags, this.state.text],
        text: '',
      });
    }
  };

  onChangeHorizontalText = horizontalText => {
    this.setState({horizontalText});

    const lastTyped = horizontalText.charAt(horizontalText.length - 1);
    const parseWhen = [',', ' ', ';', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      this.setState({
        horizontalTags: [
          ...this.state.horizontalTags,
          this.state.horizontalText,
        ],
        horizontalText: '',
      });
      this._horizontalTagInput.scrollToEnd();
    }
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
            <TagInput
              value={this.state.tags}
              onChange={this.onChangeTags}
              labelExtractor={this.labelExtractor}
              text={this.state.text}
              onChangeText={this.onChangeText}
              tagColor="#404040"
              tagTextColor="white"
              inputProps={inputProps}
              tagTextStyle={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                testAlign: 'center',
              }}
              inputProps={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              tagContainerStyle={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
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
