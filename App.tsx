import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import { Button, Title } from 'react-native-paper';
import Config from "react-native-config";
import WebView from 'react-native-webview';

const App = () => {
  const serverBaseUrl = Config.HANGMAN_TARGET_SERVER;

  return (
    <SafeAreaView style={styles.container}>
      <Title>{Config.HANGMAN_TARGET_SERVER}</Title>
      <Button mode="contained" icon="delete">Delete button example</Button>
      <View style={styles.webView}>
        <WebView
          source={{ uri: serverBaseUrl }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          sharedCookiesEnabled={true}
          scalesPageToFit={true}
          startInLoadingState={true}
          cacheEnabled={false}
          cacheMode='LOAD_NO_CACHE'
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
    padding: 10,
    borderWidth: 8,
    borderColor: 'green',
  },
});

export default App;
