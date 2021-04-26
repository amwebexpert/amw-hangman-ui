import React from 'react';
import { Platform } from 'react-native';
import { Appbar, IconButton } from "react-native-paper";
import { DrawerActions, useNavigation } from '@react-navigation/core';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

interface Props {
    title?: string;
    backButton: boolean;
}

const ApplicationBar: React.FC<Props> = ({ title, backButton }) => {
    const navigation = useNavigation();
    const displayTitle = title ? title : 'Le pendu numerique';

    function toggleDrawer() {
        navigation.dispatch(DrawerActions.toggleDrawer());
    }

    return (
        <Appbar.Header>
            {backButton ? (
                <Appbar.BackAction onPress={navigation.goBack} />
            ) : (
                <IconButton icon={MORE_ICON} onPress={toggleDrawer} />
            )}
            <Appbar.Content title={displayTitle} />
        </Appbar.Header>
    );
}

export default ApplicationBar;

