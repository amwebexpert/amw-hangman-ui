import { appConfigs } from "../app-configs";
import webUtils from "./web-utils";

const RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');

export class AuthenticationService {
    public static INSTANCE = new AuthenticationService(); // Singleton pattern

    private static LOGIN_URL_GITHUB = `${appConfigs.baseApiUrl}/oauth2/authorization/github`;
    private static LOGOUT_URL = `${appConfigs.baseApiUrl}/logout`;
    private static BASE_URL = appConfigs.baseApiUrl;

    private constructor() {
        // Singleton pattern
    }

    loginUrlGitHub(): string {
        return webUtils.buildURL(AuthenticationService.LOGIN_URL_GITHUB);
    }

    logoutUrl(): string {
        return webUtils.buildURL(AuthenticationService.LOGOUT_URL);
    }

    homeUrl(): string {
        return webUtils.buildURL(AuthenticationService.BASE_URL);
    }

    async logOut(): Promise<void> {
        const url = this.logoutUrl();
        console.log(`Calling API ${url}`);

        return new Promise(function (resolve) {
            fetch(url)
                .then(() => { /** nothing to do with the response */ })
                .catch(() => { /** nothing to do with the exception (ex: HTTP 401) */ })
                .finally(() => {
                    RCTNetworking.clearCookies(() => {
                        console.log('RCTNetworking.clearCookies.');
                        resolve();
                    });
                });
        });
    }

}
