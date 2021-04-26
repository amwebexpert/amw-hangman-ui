import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Checkbox, Headline, TextInput, useTheme } from 'react-native-paper';
import { AppStateContext } from '../../services/AppStateProvider';
import ApplicationLayout from '../ApplicationLayout/ApplicationLayout';

const Connexion: React.FC = () => {
    const { toggleDarkTheme } = useContext(AppStateContext);
    const theme = useTheme();

    const [email, setEmail] = React.useState('jane.doe@gmail.com');
    const [password, setPassword] = React.useState('Password123');
    const [emailSaving, setEmailSaving] = React.useState(false);

    return (
        <ApplicationLayout title="Connexion" backButton={true}>
            <View style={styles.container}>
                <Headline onPress={toggleDarkTheme} style={styles.title}>Authentification pour le mode en ligne</Headline>

                <TextInput style={{ backgroundColor: theme.colors.background }}
                    placeholder="Adresse courriel"
                    label="ADRESSE COURRIEL" value={email}
                    onChangeText={text => setEmail(text)} />

                <TextInput style={{ backgroundColor: theme.colors.background }}
                    placeholder="Mot de passe" label="MOT DE PASSE"
                    value={password} secureTextEntry={true}
                    onChangeText={text => setPassword(text)} />

                <View style={styles.forgotPasswordContainer}>
                    <Button onPress={() => alert('Mot de passe oublié')} compact={true} uppercase={false}>Mot de passe oublié ?</Button>
                </View>

                <View style={styles.saveEmailAddressContainer}>
                    <Checkbox.Item onPress={() => setEmailSaving(!emailSaving)}
                        style={styles.saveEmailAddress}
                        label="Sauvegarder l'adresse courriel" mode="android"
                        status={emailSaving ? 'checked' : 'unchecked'} />
                </View>

                <View style={styles.connectionContainer}>
                    <Button style={styles.connection}
                        mode="contained" onPress={() => alert('Connexion')}
                        compact={false} uppercase={false}>Connexion</Button>
                </View>

                <View style={styles.createAccountContainer}>
                    <Button labelStyle={styles.createAccount}
                        onPress={() => alert('Créer un compte')} 
                        compact={true} uppercase={false}>Créer un compte</Button>
                </View>

                <View style={styles.bottomActions}>
                    <Button onPress={() => alert("Beson d'aide")} compact={true}
                        uppercase={false}>Besoin d'aide</Button>
                    <View style={{ flex: 1 }} />
                    <Button mode="outlined"
                        onPress={() => alert("Cartes")} >Site web</Button>
                </View>

            </View>
        </ApplicationLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    forgotPasswordContainer: {
        alignItems: 'flex-start',
        marginLeft: -8,
    },
    createAccountContainer: {
        alignItems: 'flex-start',
        marginLeft: -8,
    },
    createAccount: {
        fontWeight: 'bold',
    },
    saveEmailAddressContainer: {
        marginLeft: -24,
    },
    saveEmailAddress: {
        flexDirection: 'row-reverse',
    },
    title: {
        paddingTop: 30,
        fontSize: 42,
        fontWeight: 'bold',
        lineHeight: 50,
        color: 'darkgrey',
    },
    field: {
        backgroundColor: 'white',
    },
    connectionContainer: {
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    connection: {
        borderRadius: 20,
    },
    bottomActions: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: -10,
    },
});

export default Connexion;
