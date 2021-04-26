import React from "react";
import { preferencesService, PREF_KEYS } from "./preferences-service";
import { AppStateContextType, Dictionary } from "./types";

const defaultDictionary: Dictionary = {
    categories: [],
    selectedCategoryUuid: '',
    entries: []
}

export const AppStateContext = React.createContext<AppStateContextType>({
    darkTheme: false,
    toggleDarkTheme: () => { },

    dictionary: defaultDictionary,
    setDictionary: (_: Dictionary) => { },
});

const AppStateProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [darkTheme, setDarkTheme] = React.useState<boolean>(false);
    const [dictionary, setDictionary] = React.useState<Dictionary>(defaultDictionary);

    React.useEffect(() => {
        async function init() {
            const dark = await preferencesService.getPreferenceAsBoolean(PREF_KEYS.DARK_MODE, false);
            setDarkTheme(dark);
        }

        init();
    });

    async function toggleDarkTheme() {
        setDarkTheme(darkTheme => !darkTheme);
        preferencesService.storePreference(PREF_KEYS.DARK_MODE, `${!darkTheme}`);
    }

    return (
        <AppStateContext.Provider value={{ dictionary, setDictionary, darkTheme, toggleDarkTheme }}>
            {children}
        </AppStateContext.Provider>
    );
};

export default AppStateProvider;
