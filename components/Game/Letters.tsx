import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { TextToGuess } from '../../model/text-to-guess';


interface Props {
  textToGuess: TextToGuess;
  tryChar: (c: string) => void;
}

const Letters: React.FC<Props> = ({ textToGuess, tryChar }) => {
  const buttons: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ -'.split('');

  return (
    <View style={styles.container}>
      {buttons.map((letter) => (
        <Button style={{ margin: 1, height: 40 }} key={letter} mode="contained"
          onPress={() => tryChar(letter)} disabled={textToGuess.charsTried.includes(letter)}>
          <Text style={styles.letter}>{letter}</Text>
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  letter: {
    fontFamily: 'IndieFlower-Regular',
    color: 'white',
  },
});

export default Letters;
