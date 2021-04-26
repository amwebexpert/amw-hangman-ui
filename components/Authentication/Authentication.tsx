import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebViewNavigation } from 'react-native-webview';
import { useIsFocused } from '@react-navigation/core';

import { AuthenticationService } from '../../services/authentication-service';
import { User } from "../../services/types";
import { UserService } from '../../services/user-service';
import ApplicationLayout from '../ApplicationLayout/ApplicationLayout';
import AuthenticationActions from './AuthenticationActions';
import AuthenticationSteps from './AuthenticationSteps';
import UserInfo from './UserInfo';


const authenticationService = AuthenticationService.INSTANCE;
const userService = UserService.INSTANCE;

interface Props {
    data?: string;
}

const Authentication: React.FC<Props> = (props: Props) => {
    const isFocused = useIsFocused();
    const [authenticationStep, setAuthenticationStep] = React.useState(0);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState<User | null>(null);
    const [uri, setUri] = React.useState(authenticationService.homeUrl());

    function onNavigationStateChange(navState: WebViewNavigation) {
        if (navState.loading) {
            console.log(`==> ${navState.url}...`);
        } else {
            console.log(`==> ${navState.url}.`);
            setAuthenticationStep(authenticationStep + 1);
        }
    }

    function onLogin() {
        setAuthenticationStep(authenticationStep + 1);
        setUri(authenticationService.loginUrlGitHub());
    }

    function onLogout() {
        authenticationService.logOut().then(() => {
            setUser(null);
            setAuthenticationStep(0);
            setUri(authenticationService.homeUrl());
        });
    }

    async function loadUser() {
        try {
            setUser(await userService.loadUser());
        } catch (e) {
            setUser(null);
        }
    }

    React.useEffect(() => {
        loadUser();
    }, [authenticationStep]);

    React.useEffect(() => {
        setIsAuthenticated(userService.isUserDefined(user));
    }, [user]);

    React.useEffect(() => {
        if (isFocused) {
            loadUser();
        } else {
            setAuthenticationStep(0);
        }
    }, [isFocused]);

    return (
        <ApplicationLayout title="Authentification" backButton={true}>
            <View style={styles.container}>
                {isAuthenticated ?
                    <UserInfo user={user!} />
                    :
                    <AuthenticationSteps uri={uri} authenticationStep={authenticationStep}
                        onNavigationStateChange={onNavigationStateChange} />}
                <AuthenticationActions isAuthenticated={isAuthenticated} onLogin={onLogin} onLogout={onLogout} />
            </View>
        </ApplicationLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        textAlign: 'center',
        marginVertical: 20,
        color: 'black',
    },
});

export default Authentication;
