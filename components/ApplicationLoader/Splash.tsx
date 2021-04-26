import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import Spinner from '../Spinner/Spinner';

const image = require('../../assets/game/background-pexels-pixabay-461940.jpg');

interface Props {
    progress: number;
}

const Splash: React.FC<Props> = ({ progress }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <Spinner />
                <Text style={styles.title}>chargement {progress} %</Text>
                <ProgressBar color={Colors.orange500} progress={progress / 100} style={styles.progress} indeterminate={false} />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        textAlign: 'center',
        marginTop: 30,
    },
    progress : {
        marginHorizontal: 20,
        marginBottom: 20,
    }
});

export default Splash;
