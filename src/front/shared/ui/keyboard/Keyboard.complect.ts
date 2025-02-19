import { MyLib } from '#shared/lib/my-lib';
import { createContext, ReactNode } from 'react';
import { KeyboardKeyDict, KeyboardKeyTranslateCase, KeyboardKeyTranslateLanguage } from './Keyboard.model';

export const languagedKeys: Record<
  KeyboardKeyTranslateLanguage,
  Record<KeyboardKeyTranslateCase, [string, string, string, string]>
> = {
  ru: {
    lower: ['ё1234567890ъ', 'йцукенгшщзх', 'фывапролджэ', 'ячсмитьбю.'],
    upper: ['Ё!"№;-:?*()Ъ', 'ЙЦУКЕНГШЩЗХ', 'ФЫВАПРОЛДЖЭ', 'ЯЧСМИТЬБЮ,'],
  },
  ua: {
    lower: ["'1234567890ї", 'йцукенгшщзх', 'фівапролджє', 'ячсмитьбю.'],
    upper: ['\'!"№;-:?*()Ї', 'ЙЦУКЕНГШЩЗХ', 'ФІВАПРОЛДЖЄ', 'ЯЧСМИТЬБЮ,'],
  },
  en: {
    lower: ['`1234567890-', 'qwertyuiop', "asdfghjkl;'", 'zxcvbnm,./'],
    upper: ['~!@#$%^&*()_', 'QWERTYUIOP', 'ASDFGHJKL:"', 'ZXCVBNM<>?'],
  },
};

export const keyboardNumberScreenLines = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

export const keyboardKeyDict: KeyboardKeyDict = {} as KeyboardKeyDict;
MyLib.entries(languagedKeys).forEach(([lang, { lower, upper }]) => {
  keyboardKeyDict[lang] = {
    lower: lower.map(line => line.split('')),
    upper: upper.map(line => line.split('')),
  };
});

export const KeyboardContext = createContext((() => '') as (props: any) => ReactNode);
