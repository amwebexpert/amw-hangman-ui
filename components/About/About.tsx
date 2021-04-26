import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Avatar, Caption, Card, Paragraph, Title } from 'react-native-paper';
import { QueryFunctionContext, useQuery } from 'react-query';
import { appConfigs } from '../../app-configs';
import { AboutDto } from '../../services/types';
import ApplicationLayout from '../ApplicationLayout/ApplicationLayout';
import Spinner from '../Spinner/Spinner';

const url = `${appConfigs.baseApiUrl}/api/v1/about`;
const image = require('../../assets/game/background-pexels-pixabay-461940.jpg');

interface Props {
    data?: string;
}

async function fetchAboutInfo(context: QueryFunctionContext): Promise<AboutDto> {
    const key = context.queryKey[0] as string;
    const flag = context.queryKey[1] as boolean;

    const { data } = await axios.get<AboutDto>(url);
    console.log(`Called ${key} with flag ${flag}: ${url}`);
    return data;
};

const About: React.FC<Props> = (props: Props) => {
    const { isLoading, isSuccess, data, refetch } = useQuery<AboutDto, Error>(['about', true], fetchAboutInfo);

    useFocusEffect(
        React.useCallback(() => {
            refetch();
        }, [])
    );

    const AppImage = () => <Avatar.Image size={48} source={require('../../assets/icon.png')} />;

    return (
        <ApplicationLayout title="A propos..." backButton={true}>
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                    <View style={styles.textContainer}>
                        <Title style={styles.title}>À propos de cette application...</Title>

                        {isLoading && <Spinner />}

                        {isSuccess &&
                            <Card style={styles.card}>
                                <Card.Title title="Le plendu numérique"
                                    subtitle="Jeu de devinette" left={AppImage} />
                                <Card.Content>
                                    <View style={styles.entry}>
                                        <Caption>Version du serveur</Caption>
                                        <Paragraph>{data!.name} - v{data!.version}</Paragraph>
                                        <Paragraph>{data!.description}</Paragraph>
                                    </View>

                                    <View style={styles.entry}>
                                        <Caption>Utilisateur</Caption>
                                        <Paragraph>{data!.currentUser}</Paragraph>
                                    </View>
                                </Card.Content>
                            </Card>
                        }
                    </View>
                </ImageBackground>
            </View>
        </ApplicationLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    textContainer: {
        color: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        fontFamily: 'IndieFlower',
        color: 'white',
        marginBottom: 20,
    },
    aboutInfo: {
        fontFamily: 'IndieFlower',
        color: 'white',
        fontSize: 14,
    },
    card: {
        width: 300,
        maxWidth: 330,
    },
    entry: {
        marginTop: 20,
        marginHorizontal: 5,
    },
});

export default About;
