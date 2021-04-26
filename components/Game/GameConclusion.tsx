import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Headline } from 'react-native-paper';
import { GAME_IMAGES } from '../../model/game-images';
import { TextToGuess } from '../../model/text-to-guess';

interface Props {
    textToGuess: TextToGuess;
}

const GameConclusion: React.FC<Props> = ({ textToGuess }) => {
    const containerTextToGuess = [
        styles.containerTextToGuess,
        textToGuess.isGameOverWithSuccess() ? styles.success : styles.failure
    ];

    return (
        <View style={styles.container}>
            <Headline style={containerTextToGuess}>{textToGuess.characters}</Headline>
            <Image source={GAME_IMAGES.get(textToGuess.gameOverImage())}
                style={styles.containerGameImage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerGameImage: {
        maxHeight: 140,
        maxWidth: 140,
    },
    containerTextToGuess: {
        fontFamily: 'IndieFlower',
        fontSize: 24,
        letterSpacing: 10,
    },
    success: {
        color: 'green',
    },
    failure: {
        color: 'red',
    },
});

export default GameConclusion;
