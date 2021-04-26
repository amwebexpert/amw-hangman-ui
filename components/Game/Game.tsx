import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { GAME_IMAGES } from '../../model/game-images';
import { TextToGuess } from '../../model/text-to-guess';
import { AppStateContext } from '../../services/AppStateProvider';
import { useDictionary } from '../../services/dictionary-hook';
import ApplicationLayout from '../ApplicationLayout/ApplicationLayout';
import Spinner from '../Spinner/Spinner';
import GameConclusion from './GameConclusion';
import Letters from './Letters';

interface Props {
  data?: string;
}

const Game: React.FC<Props> = (props: Props) => {
  const { dictionary } = useDictionary();
  const [textToGuess, setTextToGuess] = React.useState<TextToGuess>(new TextToGuess(''));

  React.useEffect(() => reset(), [dictionary]);

  function reset() {
    if (!dictionary || !dictionary.entries || dictionary.entries.length === 0) {
      return;
    }
    const entries = dictionary.entries;
    const random = Math.floor(Math.random() * entries.length);
    const text = entries[random].normalized;
    setTextToGuess(new TextToGuess(text));
  }

  function getCurrentCategory(): string {
    const selectedCategoryUuid = dictionary.selectedCategoryUuid;
    return dictionary.categories
      .find((c) => c.uuid === selectedCategoryUuid)!.name;
  }

  function tryChar(c: string) {
    setTextToGuess(textToGuess.tryChar(c));
  }

  return (
    <ApplicationLayout backButton={false}>
      <View style={styles.container}>
        <Text style={styles.category}>categorie: "{getCurrentCategory()}"</Text>
        <Text style={styles.containerTextToGuess}>{textToGuess.wordGame()}</Text>
        <Image source={GAME_IMAGES.get(textToGuess.currentStateImage())} style={styles.containerGameImage} />
        {textToGuess.isGameOver() ?
          <GameConclusion textToGuess={textToGuess} /> :
          <Letters textToGuess={textToGuess} tryChar={tryChar} />
        }
      </View>

      <FAB style={styles.fab} icon="refresh" onPress={reset} />
    </ApplicationLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  category: {
    fontFamily: 'IndieFlower',
    fontSize: 18,
    color: 'orange',
  },
  containerTextToGuess: {
    fontFamily: 'IndieFlower',
    fontSize: 24,
    letterSpacing: 10,
    color: 'orange',
  },
  containerGameImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'stretch',
  },
  fab: {
    position: 'absolute',
    backgroundColor: 'orange',
    right: 16,
    top: 32,
  },
});

export default Game;

