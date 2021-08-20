export interface LanguageEntry {
    readonly language: string;
    readonly identifier: string;
}

export const languageEntries: LanguageEntry[] = [
    {
        language: "Amharic",
        identifier: "am"
    },
    {
        language: "German",
        identifier: "de"
    },
    {
        language: "Malayalam",
        identifier: "ml"
    },
    {
        language: "Slovak",
        identifier: "sk"
    },
    {
        language: "Arabic",
        identifier: "ar"
    },
    {
        language: "Greek",
        identifier: "el"
    },
    {
        language: "Maldivian",
        identifier: "dv"
    },
    {
        language: "Slovenian",
        identifier: "sl"
    },
    {
        language: "Armenian",
        identifier: "hy"
    },
    {
        language: "Gujarati",
        identifier: "gu"
    },
    {
        language: "Marathi",
        identifier: "mr"
    },
    {   language: "Sorani Kurdish",
        identifier: "ckb"
    },
    {
        language: " Basque",
        identifier: "eu"
    },
    {
        language: "Haitian Creole",
        identifier: "ht"
    },
    {
        language: "Nepali",
        identifier: "ne"
    },
    {
        language: "Spanish",
        identifier: "es"
    },
    {
        language: "Bengali",
        identifier: "bn"
    },
    {
        language: "Hebrew",
        identifier: "iw"
    },
    {
        language: "Norwegian",
        identifier: "no"
    },
    {
        language: "Swedish",
        identifier: "sv"
    },
    {
        language: "Bosnian",
        identifier: "bs"
    },
    {
        language: "Hindi",
        identifier: "hi"
    },
    {
        language: "Oriya",
        identifier: "or"
    },
    {
        language: "Tagalog",
        identifier: "tl"
    },
    {
        language: "Bulgarian",
        identifier: "bg"
    },
    {
        language: "Latinized Hindi",
        identifier: "hi-Latn"
    },
    {
        language: "Panjabi",
        identifier: "pa"
    },
    {
        language: "Tamil",
        identifier: "ta"
    },
    {
        language: "Burmese",
        identifier: "my"
    },
    {
        language: "Hungarian",
        identifier: "hu"
    },
    {
        language: "Pashto",
        identifier: "ps"
    },
    {
        language: "Telugu",
        identifier: "te"
    },
    {   
        language: "Croatian",
        identifier: "hr"
    },
    {
        language: "Icelandic",
        identifier: "is"
    },
    {
        language: "Persian",
        identifier: "fa"
    },
    {
        language: "Thai",
        identifier: "th"
    },
    {
        language: "Catalan",
        identifier: "ca"
    },
    {
        language: "Indonesian",
        identifier: "in"
    },
    {
        language: "Polish",
        identifier: "pl"
    },
    {
        language: "Tibetan",
        identifier: "bo"
    },
    {
        language: "Czech",
        identifier: "cs"
    },
    {
        language: "Italian",
        identifier: "it"
    },
    {
        language: "Portuguese",
        identifier: "pt"
    },
    {
        language: "Traditional Chinese",
        identifier: "zh-TW"
    },
    {
        language: "Danish",
        identifier: "da"
    },
    {
        language: "Japanese",
        identifier: "ja"
    },
    {
        language: "Romanian",
        identifier: "ro"
    },
    {
        language: "Turkish",
        identifier: "tr"
    },
    {
        language: "Dutch",
        identifier: "nl"
    },
    {
        language: "Kannada",
        identifier: "kn"
    },
    {
        language: "Russian",
        identifier: "ru"
    },
    {
        language: "Ukrainian",
        identifier: "uk"
    },
    {
        language: "English",
        identifier: "en"
    },
    {
        language: "Khmer",
        identifier: "km"
    },
    {
        language: "Serbian",
        identifier: "sr"
    },
    {
        language: "Urdu",
        identifier: "ur"
    },
    {
        language: "Estonian",
        identifier: "et"
    },
    {
        language: "Korean",
        identifier: "ko"
    },
    {
        language: "Simplified Chinese",
        identifier: "zh-CN"
    },
    {
        language: "Uyghur",
        identifier: "ug"
    },
    {
        language: "Finnish",
        identifier: "fi"
    },
    {
        language: "Lao",
        identifier: "lo"
    },
    {
        language: "Sindhi",
        identifier: "sd"
    },
    {
        language: "Vietnamese",
        identifier: "vi"
    },
    {
        language: "French",
        identifier: "fr"
    },
    {
        language: "Latvian",
        identifier: "lv"
    },
    {
        language: "Sinhala",
        identifier: "si"
    },
    {
        language: "Welsh",
        identifier: "cy"
    },
    {
        language: "Georgian",
        identifier: "ka"
    },
    {
        language: "Lithuanian",
        identifier: "lt"
    },
]

const result = new Map();

export function languageMap(): Map<string, string> {
    if (result.entries.length) {
        return result;
    }
    languageEntries.map(entry => {
        result.set(entry.language, entry.identifier);
    })
    return result;
}