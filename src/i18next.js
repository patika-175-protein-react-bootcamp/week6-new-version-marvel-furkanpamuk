import  i18n  from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
        en: {
            translation: require('./constants/languages/en.json')
        },
        tr: {
            translation: require('./constants/languages/tr.json')
        },
        fr: {
            translation: require('./constants/languages/fr.json')
        }
    },
    debug: true,
    interpolation: {
        escapeValue: false
    }
})

i18n.languages = ['en', 'tr']

export default i18n;