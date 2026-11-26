import type { Langi } from 'shared/api';
import type { LocaleDynamic } from 'shared/model/+locale/dynamic';

type DynamicLocale = LocaleDynamic<Langi>;

let takeDynamicLocale: () => DynamicLocale = () => {
  throw 'setDynamicLocaleProvider was never called';
};

// Провайдер словарей всех языков нужен для данных, которые не зависят от текущего языка интерфейса.
let takeAllDynamicLocales: () => DynamicLocale[] = () => {
  throw 'setAllDynamicLocalesProvider was never called';
};

// Провайдер текущего динамического словаря регистрируется на фронте до первого вызова перевода.
export const setDynamicLocaleProvider = (provider: () => DynamicLocale) => {
  takeDynamicLocale = provider;
};

// Провайдер словарей всех языков регистрируется на фронте рядом с провайдером текущего языка.
export const setAllDynamicLocalesProvider = (provider: () => DynamicLocale[]) => {
  takeAllDynamicLocales = provider;
};

// Читает значение из динамического словаря текущего языка через переданный селектор.
export const translateDynamicBase = <Value>(selector: (dict: DynamicLocale) => Value): Value =>
  selector(takeDynamicLocale());

// Объединяет массивы одного ключа из словарей всех языков без повторов:
// так теги распознаются независимо от выбранного языка интерфейса.
export const translateDynamicUnion = <Value>(selector: (dict: DynamicLocale) => Value[]): Value[] => [
  ...new Set(takeAllDynamicLocales().flatMap(selector)),
];
