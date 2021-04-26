import React from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { Button, Title } from 'react-native-paper';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Title>My Title</Title>
      <Button mode="contained" icon="delete">Delete button</Button>
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
