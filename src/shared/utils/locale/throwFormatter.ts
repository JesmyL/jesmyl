import type { LocalePayloadKind } from 'shared/model/+locale/model';
import type { JsonString } from '../utils';

/** Собирает строку ошибки с числовым префиксом вида payload'а: `${kind} ${jsonPayload}`. */
export const throwFormatter = <Val>(kind: LocalePayloadKind, jsonPayload: JsonString<Val>) =>
  `${kind} ${jsonPayload}`;
