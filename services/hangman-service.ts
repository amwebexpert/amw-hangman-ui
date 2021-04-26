import AsyncStorage from '@react-native-async-storage/async-storage';

import { appConfigs } from "../app-configs";
import { ApiCategory, ApiText, Dictionary } from "./types";
import webUtils from "./web-utils";

export class HangmanService {
    public static INSTANCE = new HangmanService(); // Singleton pattern

    private static CATEGORIES_URL = '/api/v1/categories';

    private constructor() {
        // Singleton pattern
    }

    async loadCategories(): Promise<ApiCategory[]> {
        const url = `${appConfigs.baseApiUrl}${HangmanService.CATEGORIES_URL}`;
        console.log(`Calling API ${url}`);

        return new Promise(function (resolve, reject) {
            fetch(url)
                .then(webUtils.httpGetResponseHandler)
                // .then(data => resolve(data['content']))
                .then(data => resolve(data))
                .catch(e => webUtils.logAndReject(e, reject));
        });
    }

    async loadApiTexts(selectedCategoryUuid: string): Promise<ApiText[]> {
        await AsyncStorage.setItem('selectedCategoryUuid', selectedCategoryUuid);
        const categoriesUrl = `${appConfigs.baseApiUrl}${HangmanService.CATEGORIES_URL}`;
        const url = `${categoriesUrl}/${selectedCategoryUuid}/texts`;
        console.log(`Calling API ${url}`);

        return new Promise(function (resolve, reject) {
            fetch(url)
                .then(webUtils.httpGetResponseHandler)
                // .then(data => resolve(data['content']))
                .then(data => resolve(data))
                .catch(e => webUtils.logAndReject(e, reject));
        });
    }

    private async getLastSelectedCategory(categories: ApiCategory[]): Promise<string> {
        let selectedCategoryUuid = await AsyncStorage.getItem('selectedCategoryUuid');

        if (!selectedCategoryUuid) {
            selectedCategoryUuid = categories[0].uuid;
            await AsyncStorage.setItem('selectedCategoryUuid', selectedCategoryUuid);
        }

        return selectedCategoryUuid;
    }

    async init(): Promise<Dictionary> {
        const categories = await this.loadCategories();
        const selectedCategoryUuid = await this.getLastSelectedCategory(categories);
        const entries = await this.loadApiTexts(selectedCategoryUuid);

        return {
            categories,
            selectedCategoryUuid,
            entries
        };
    }
}
