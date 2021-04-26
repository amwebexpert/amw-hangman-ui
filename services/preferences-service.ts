import AsyncStorage from "@react-native-async-storage/async-storage";
import { appConfigs } from "../app-configs";

export enum PREF_KEYS {
    DARK_MODE = 'DARK_MODE',
}

class PreferencesService {

    async storePreference(name: string, value: string): Promise<void> {
        console.log('storePreference', { name, value });
        return AsyncStorage.setItem(name, value);
    }

    async getPreferenceAsBoolean(name: string, defaultValue: boolean): Promise<boolean> {
        const value = await AsyncStorage.getItem(name);

        if (value) {
            return Promise.resolve(value === 'true');
        } else {
            return Promise.resolve(defaultValue);
        }
    }

}

export const preferencesService = new PreferencesService();
