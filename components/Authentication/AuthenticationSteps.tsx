import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { WebViewNavigation } from 'react-native-webview/lib/WebViewTypes';

import Spinner from '../Spinner/Spinner';


interface Props {
    uri: string;
    authenticationStep: number;
    onNavigationStateChange: (navState: WebViewNavigation) => void;
}

const AuthenticationSteps: React.FC<Props> = ({ uri, authenticationStep: step, onNavigationStateChange }) => {
    const initialPage = step === 0;

    return (
        <View style={styles.container}>
            {initialPage ?
                <View style={styles.containerStepInitial}>
                    <Text>Veuillez vous authentifier afin</Text>
                    <Text>d'accéder à plus de fonctionnalités</Text>
                </View>
                :
                <WebView
                    startInLoadingState={true}
                    cacheEnabled={false}
                    cacheMode='LOAD_NO_CACHE'
                    renderLoading={() => (<Spinner />)}
                    onNavigationStateChange={onNavigationStateChange}
                    sharedCookiesEnabled={true}
                    source={{
                        uri,
                        headers: {
                            'react-native-UI': 'Hangman',
                        },
                    }}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerStepInitial: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AuthenticationSteps;
