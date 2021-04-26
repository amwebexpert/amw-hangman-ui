import React from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { Button, Title } from 'react-native-paper';
import Config from "react-native-config";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Title>{Config.HANGMAN_TARGET_SERVER}</Title>
      <Button mode="contained" icon="delete">Delete button example</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
