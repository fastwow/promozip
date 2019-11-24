import React, {Component} from 'react';
import {Button, Divider, Text, Overlay} from 'react-native-elements';

import TagInput from 'react-native-tag-input';
import {View, TextInput} from 'react-native';
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
    fontSize: 18,
    marginVertical: Platform.OS == 'ios' ? 10 : -2,
  },
};

class NewMatchScreen extends Component {
  store = AppStore;

  static navigationOptions = ({navigation}) => ({
    title: 'New Check',
  });

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      skills: [],
      text: '',
      isLoading: false,
      review: '',
      step: 'job',
      description: '',
      tags: [],
      text: '',
      match: null,
      title: '',
      url: '',
    };
  }

  labelExtractor = tag => tag;

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

  render() {
    return (
      <LinearGradient
        style={{
          flex: 1,
        }}
        colors={['#1B1B1B', '#404040']}>
        <Text
          style={{
            color: 'white',
            borderColor: 12,
            paddingLeft: 12,
            paddingRight: 12,
            fontSize: 20,
            alignSelf: 'center',
            marginTop: 12,
            paddingTop: 6,
            paddingBottom: 6,
          }}>
          {this.state.step === 'cv'
            ? '2'
            : this.state.step === 'job'
            ? '1'
            : ''}
          /2
        </Text>
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
              alignSelf: 'center',
              paddingTop: 16,
            }}>
            {this.state.step === 'cv' ? 'Skills' : 'Job'}
          </Text>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 24,
              paddingTop: 16,
              alignSelf: 'center',
              marginBottom: 16,
            }}>
            {this.state.step === 'cv'
              ? 'What skills do you have?'
              : 'What is job requirements?'}
          </Text>
        </View>
        <ScrollView>{this.renderStep()}</ScrollView>
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
            if (this.state.step === 'job') {
              this.setState({step: 'cv'});
            } else {
              this.setState({isVisible: true, isLoading: true});
              match = await this.store.newMatch({
                title: this.state.title,
                description: this.state.description,
                skills: this.state.tags,
              });
              this.setState({isVisible: true, match, isLoading: false});
            }
          }}
          title={this.state.step === 'job' ? 'Next' : 'Submit'}
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
              Congratulations!
            </Text>
            <Text style={{padding: 10, fontSize: 16}}>
              We built a learning plan for you!
            </Text>
            <Button
              buttonStyle={{
                height: 50,
                backgroundColor: '#fe824c',
                borderRadius: 12,
              }}
              style={{padding: 10, width: 200}}
              title="Check out"
              onPress={() => {
                this.setState({isVisible: false});
                this.props.navigation.navigate('LearningPlan', {
                  title: this.state.match.title,
                  matchId: this.state.match.id,
                });
              }}
            />
          </View>
        </Overlay>
        {this.state.isLoading && (
          <Spinner
            text="Building the learning plan..."
            visible={this.state.isLoading}
            textStyle={{color: 'white'}}
          />
        )}
      </LinearGradient>
    );
  }

  renderStep = () => {
    return this.state.step === 'cv' ? (
      <View
        style={{
          height: '100%',
          flex: 1,
          backgroundColor: 'white',
          marginTop: 24,
          margin: 12,
          borderRadius: 12,
        }}>
        <Divider style={{marginBottom: 12}} />
        <View style={{margin: 12}}>
          <TagInput
            value={this.state.tags}
            onChange={this.onChangeTags}
            labelExtractor={this.labelExtractor}
            text={this.state.text}
            onChangeText={this.onChangeText}
            tagColor="#404040"
            tagTextColor="white"
            inputProps={inputProps}
            maxHeight={500}
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
              placeholderTextColor: 'grey',
            }}
            tagContainerStyle={{
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>
      </View>
    ) : (
      <>
        <View
          style={{
            height: '100%',
            flex: 1,
            backgroundColor: 'white',
            marginTop: 24,
            margin: 12,
            borderRadius: 12,
          }}>
          <Divider style={{marginBottom: 12}} />
          <View style={{marginLeft: 12, marginRight: 12, marginBottom: 12}}>
            <TextInput
              style={{marginTop: 12, marginBottom: 12}}
              placeholder="Job title"
              placeholderTextColor="grey"
              fontSize={16}
              onChangeText={title => this.setState({title})}
              value={this.state.title}
            />
            <Divider style={{backgroundColor: 'grey'}} />
            <TextInput
              style={{marginTop: 12, marginBottom: 12}}
              placeholder="Job description"
              placeholderTextColor="grey"
              fontSize={16}
              onChangeText={description => this.setState({description})}
              value={this.state.description}
            />
          </View>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            color: 'white',
            alignSelf: 'center',
          }}>
          OR
        </Text>
        <View
          style={{
            height: '100%',
            flex: 1,
            backgroundColor: 'white',
            marginTop: 12,
            margin: 12,
            borderRadius: 12,
          }}>
          <TextInput
            style={{margin: 12}}
            placeholder="Craigslist url link..."
            placeholderTextColor="grey"
            fontSize={16}
            onChangeText={url => this.setState({url})}
            value={this.state.url}
          />
        </View>
      </>
    );
  };
}

export default observer(NewMatchScreen);
