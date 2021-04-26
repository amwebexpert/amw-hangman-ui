import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';

export interface AppTheme extends Theme {
    margins : {
        leftIndentRemoved: number;
    }
}

const appCommonTheme = {
    margins : {
        leftIndentRemoved: -8,
    }
}

export const appLightTheme = {
    ...appCommonTheme,
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        primary: 'darkorange',
        background: 'white',
    },
};

export const appDarkTheme = {
    ...appCommonTheme,
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
        ...NavigationDarkTheme.colors,
        ...PaperDarkTheme.colors,
        primary: 'darkorange',
        background: 'black',
    },
};
