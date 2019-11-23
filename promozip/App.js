import React from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import UserNavigator from './src/navigation/UserNavigator';

const App = () => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <UserNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
