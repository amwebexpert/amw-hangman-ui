import { appConfigs } from "../app-configs";
import { User } from "./types";
import webUtils from "./web-utils";

export class UserService {
    public static INSTANCE = new UserService(); // Singleton pattern

    private static USER_URL = `${appConfigs.baseApiUrl}/api/v1/user`;

    private constructor() {
        // Singleton pattern
    }

    isUserDefined(user?: User | null) {
        if (user && user.name && user.name.trim().length > 0) {
            return true;
        } else {
            return false;
        }
    }

    async loadUser(): Promise<User> {
        const url = webUtils.buildURL(UserService.USER_URL);
        console.log(`Calling API ${url}`);

        return new Promise(function (resolve, reject) {
            fetch(url)
                .then(webUtils.httpGetResponseHandler)
                .then(data => resolve(data))
                .catch(e => webUtils.logAndReject(e, reject));
        });
    }

}
