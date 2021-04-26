import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme
} from 'react-native';
import { Button, Title } from 'react-native-paper';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Title>My Title</Title>
      <Button mode="contained" icon="delete">test</Button>
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
