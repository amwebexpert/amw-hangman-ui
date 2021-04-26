import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from 'react-query';
import About from './components/About/About';
import ApplicationLoader from './components/ApplicationLoader/ApplicationLoader';
import Authentication from './components/Authentication/Authentication';
import CategorySelector from './components/CategorySelector/CategorySelector';
import Connexion from './components/Connexion/Connexion';
import Game from './components/Game/Game';
import AppStateProvider, { AppStateContext } from './services/AppStateProvider';
import { appDarkTheme, appLightTheme } from './styles/global-theme';


const queryClient = new QueryClient();

const Drawer = createDrawerNavigator();

let authViaWebviewWithSharedSession = false;

export default function App() {
  return (
    <AppStateProvider>
      <ApplicationLoader>
        <AppStateContext.Consumer>
          {({ darkTheme }) => (
            <PaperProvider theme={darkTheme ? appDarkTheme : appLightTheme}>
              <QueryClientProvider client={queryClient}>
                <NavigationContainer theme={darkTheme ? appDarkTheme : appLightTheme}>
                  <Drawer.Navigator initialRouteName="Game">
                    <Drawer.Screen name="Game" component={Game} options={{ title: 'Le pendu numerique' }} />
                    <Drawer.Screen name="Category" component={CategorySelector} options={{ title: 'Categories' }} />
                    <Drawer.Screen name="About" component={About} options={{ title: 'A propos...' }} />
                    {authViaWebviewWithSharedSession &&
                      <Drawer.Screen name="Authentication" component={Authentication} options={{ title: 'Authentification' }} />}
                    {!authViaWebviewWithSharedSession &&
                      <Drawer.Screen name="Connexion" component={Connexion} options={{ title: 'Connexion' }} />}
                  </Drawer.Navigator>
                </NavigationContainer>
              </QueryClientProvider>
            </PaperProvider>
          )}
        </AppStateContext.Consumer>
      </ApplicationLoader>
    </AppStateProvider>
  );
}
