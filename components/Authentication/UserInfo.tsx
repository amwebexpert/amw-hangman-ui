import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { User } from '../../services/types';

interface Props {
    user?: User;
}

const UserInfo: React.FC<Props> = ({ user }) => {
    const userName = user ? user.name : '---';

    return (
        <View style={styles.container}>
            <Text>Utilisateur: {userName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default UserInfo;
