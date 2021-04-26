import Config from "react-native-config";

export const appConfigs = {
    baseApiUrl: Config.HANGMAN_TARGET_SERVER || '<environment variable not set>',
};

console.log('Native app baseApiUrl', appConfigs.baseApiUrl);
