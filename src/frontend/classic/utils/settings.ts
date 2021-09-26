import { writable, Writable } from 'svelte/store';

type SettingValue = string | number | boolean;
export type SettingValidator = ((value: SettingValue) => boolean) | undefined;

export const updateStoreValue = (store: Writable<SettingValue>, storageKey: string, storeValue: SettingValue, validator: SettingValidator) => {
    store.update((self) => {
        if (!validator || (validator && validator(storeValue))) {
            self = storeValue
            peristStoreValue(
                storageKey,
                storeValue
            );
        }

        return self;
    });
};

// We persist the data if is optinal validator return true then we execute extra logic
const peristStoreValue = (
    key: string,
    value: SettingValue,
): void => {
    localStorage.setItem(key, value.toString());

};

const getSettingDefaultValue = (key: string, defaultValue: SettingValue) => {
    return localStorage.getItem(key) ?? defaultValue;
};

// We need to do this because the default value can be a regular boolean or boolean "as string" (if we get the value from localStorage)
// The problem is we can't type cast localStorage (Ex: "false" as boolean = true) value easely so we need to do this
const castBooleanSetting = (settingValue: SettingValue): boolean => settingValue === "true" || settingValue === true;

export const settings = {
    DEMO_SELECT: {
        KEY: "DEMO_SELECT",
        DEFAULT_VALUE: "g90",
    },
    DEMO_TEXT_INPUT: {
        KEY: "DEMO_TEXT_INPUT",
        DEFAULT_VALUE: "toto"
    },
    DEMO_TOGGLE: {
        KEY: "DEMO_TOGGLE",
        DEFAULT_VALUE: true
    },
    DEMO_NUMBER_INPUT: {
        KEY: "DEMO_NUMBER_INPUT",
        DEFAULT_VALUE: 3
    },
    DEMO_FILE_INPUT: {
        KEY: "DEMO_FILE_INPUT",
        DEFAULT_VALUE: ""
    },
    DEMO_PASSWORD_INPUT: {
        KEY: "DEMO_PASSWORD_INPUT",
        DEFAULT_VALUE: "STRONGPASSWORD"
    },
    WEBSITE_1_USERNAME: {
        KEY: "WEBSITE_1_USERNAME",
        DEFAULT_VALUE: "Toto"
    },
    WEBSITE_1_PASSWORD: {
        KEY: "WEBSITE_1_PASSWORD",
        DEFAULT_VALUE: "STRONGPASSWORD"
    },
    SHOW_CONTENT_PANEL: {
        KEY: "SHOW_CONTENT_PANEL",
        DEFAULT_VALUE: true
    },
    THEME: {
        KEY: "THEME",
        DEFAULT_VALUE: "hakuneko"
    },
    VIEWER_MODE: {
        KEY: "VIEWER_MODE",
        DEFAULT_VALUE: "vertical"
    },
    INVERSED_READING: {
        KEY: "INVERSED_READING",
        DEFAULT_VALUE: false
    },
    DOUBLE_PAGE: {
        KEY: "DOUBLE_PAGE",
        DEFAULT_VALUE: false
    },
    MANGA_VIEWER_TRANSITION: {
        KEY: "MANGA_VIEWER_TRANSITION",
        DEFAULT_VALUE: true
    },
    HORIZONTAL_MARGIN: {
        KEY: "HORIZONTAL_MARGIN",
        DEFAULT_VALUE: 2
    },
    VERTICAL_MARGIN: {
        KEY: "VERTICAL_MARGIN",
        DEFAULT_VALUE: 2
    }
};

export const demoSelect = writable(String(getSettingDefaultValue(settings.DEMO_SELECT.KEY, settings.DEMO_SELECT.DEFAULT_VALUE)));
export const demoTextInput = writable(String(getSettingDefaultValue(settings.DEMO_TEXT_INPUT.KEY, settings.DEMO_TEXT_INPUT.DEFAULT_VALUE)));
export const demoToggle = writable(castBooleanSetting(getSettingDefaultValue(settings.DEMO_TOGGLE.KEY, settings.DEMO_TOGGLE.DEFAULT_VALUE)));
export const demoNumberInput = writable(Number(getSettingDefaultValue(settings.DEMO_NUMBER_INPUT.KEY, settings.DEMO_NUMBER_INPUT.DEFAULT_VALUE)));
export const demoFileInput = writable(String(getSettingDefaultValue(settings.DEMO_FILE_INPUT.KEY, settings.DEMO_FILE_INPUT.DEFAULT_VALUE)));
export const demoPasswordInput = writable(String(getSettingDefaultValue(settings.DEMO_PASSWORD_INPUT.KEY, settings.DEMO_PASSWORD_INPUT.DEFAULT_VALUE)));
export const website1Username = writable(String(getSettingDefaultValue(settings.WEBSITE_1_USERNAME.KEY, settings.WEBSITE_1_USERNAME.DEFAULT_VALUE)));
export const website1Password = writable(String(getSettingDefaultValue(settings.WEBSITE_1_PASSWORD.KEY, settings.WEBSITE_1_PASSWORD.DEFAULT_VALUE)));
export const showContentPanel = writable(castBooleanSetting(getSettingDefaultValue(settings.SHOW_CONTENT_PANEL.KEY, settings.SHOW_CONTENT_PANEL.DEFAULT_VALUE)));
export const theme = writable(String(getSettingDefaultValue(settings.THEME.KEY, settings.THEME.DEFAULT_VALUE)));
export const viewerMode = writable(String(getSettingDefaultValue(settings.VIEWER_MODE.KEY, settings.VIEWER_MODE.DEFAULT_VALUE)));
export const inversedReading = writable(castBooleanSetting(getSettingDefaultValue(settings.INVERSED_READING.KEY, settings.INVERSED_READING.DEFAULT_VALUE)));
export const doublePage = writable(castBooleanSetting(getSettingDefaultValue(settings.DOUBLE_PAGE.KEY, settings.DOUBLE_PAGE.DEFAULT_VALUE)));
export const mangaViewerTransition = writable(castBooleanSetting(getSettingDefaultValue(settings.MANGA_VIEWER_TRANSITION.KEY, settings.MANGA_VIEWER_TRANSITION.DEFAULT_VALUE)));
export const horizontalMargin = writable(Number(getSettingDefaultValue(settings.HORIZONTAL_MARGIN.KEY, settings.HORIZONTAL_MARGIN.DEFAULT_VALUE)));
export const verticalMargin = writable(Number(getSettingDefaultValue(settings.VERTICAL_MARGIN.KEY, settings.VERTICAL_MARGIN.DEFAULT_VALUE)));
