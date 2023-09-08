import { createI18n } from "vue-i18n";
import en from "./lang/en";
import zh from "./lang/zh";

export const messages = {
    'en-US':{
        message:en
    },
    'zh-CN':{
        message:zh
    }
}

export const i18n = createI18n({
    legacy: false,
    locate:'en-US',
    fallbackLocale:'zh-CN',
    messages
})