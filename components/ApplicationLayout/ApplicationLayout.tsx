import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import ApplicationBar from './ApplicationBar';

interface Props {
    title?: string;
    backButton: boolean;
    children: ReactNode;
}

const useStyles = () => {
    const theme = useTheme();

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
    })
};

const ApplicationLayout: React.FC<Props> = ({ title, children, backButton }) => {
    const styles = useStyles();

    // https://reactnative.dev/docs/safeareaview
    return (
        <SafeAreaView style={styles.container}>
            <ApplicationBar title={title} backButton={backButton} />
            {children}
        </SafeAreaView>
    );
}

export default ApplicationLayout;

