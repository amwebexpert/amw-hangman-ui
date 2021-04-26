import React from "react";
import { AppStateContext } from "./AppStateProvider";
import { HangmanService } from "./hangman-service";

const service = HangmanService.INSTANCE;

export const useDictionary = () => {
    const { dictionary, setDictionary} = React.useContext(AppStateContext);

    React.useEffect(() => {
        async function init() {
            const dictionary = await service.init();
            setDictionary(dictionary);
        }

        if (!dictionary.selectedCategoryUuid) {
            init();
        }
    }, [dictionary]);

    function selectCategory(selectedCategoryUuid: string) {
        async function loadEntries() {
            const entries = await service.loadApiTexts(selectedCategoryUuid);
            setDictionary({
                categories: dictionary.categories,
                selectedCategoryUuid,
                entries
            });
        }

        loadEntries();
    }

    return {
        dictionary,
        selectCategory
    };
}