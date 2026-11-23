import { BibleBooki, BibleBroadcastSingleAddress, BibleChapteri } from '$bible/shared/model/base';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { StrRegExp } from 'regexpert';
import { BibleTranslateName } from 'shared/model/bible';

export interface IBibleBroadcastSearchRequest {
  token?: number;
  term: string;
  booki: BibleBooki;
  chapteri: BibleChapteri;
  listenScope: BibleBroadcastKeyListenScope;
  showTranslates: BibleTranslateName[];
  maxItems: number;
}

export type BibleBroadcastSearchResponse = {
  token?: number;
  list: BibleBroadcastSingleAddress[];
  splitReg: StrRegExp;
  term: string;
};
