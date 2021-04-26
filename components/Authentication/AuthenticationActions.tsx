import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';

interface Props {
    isAuthenticated: boolean;
    onLogin: () => void;
    onLogout: () => void;
}

const AuthenticationActions: React.FC<Props> = ({ isAuthenticated, onLogin, onLogout }) => {
    return (
        <View style={styles.container}>
            <Button disabled={isAuthenticated} icon="login" mode="contained" onPress={onLogin}>Connecter</Button>
            <Button disabled={!isAuthenticated} icon="logout" mode="contained" onPress={onLogout}>Quitter</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default AuthenticationActions;
