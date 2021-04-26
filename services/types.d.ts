// USER api
export interface User {
    name: string;
    email: string;
}

//  TEXT api
export interface ApiCategory {
    id: number;
    uuid: string;
    langCode: string;
    name: string;
}

export interface ApiText {
    id: number;
    uuid: string;
    original: string;
    normalized: string;
}

export interface AboutDto {
    name: string;
    version: string;
    description: string;
    currentUser: string;
}

export interface Dictionary {
    categories: ApiCategory[];
    selectedCategoryUuid: string;
    entries: ApiText[];
}

export interface AppStateContextType {
    darkTheme: boolean;
    toggleDarkTheme: () => void;

    dictionary: Dictionary;
    setDictionary: (dictionary: Dictionary) => void;
}
