import { BibleBooki, BibleBroadcastSingleAddress, BibleChapteri } from '$bible/shared/model/base';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { StrRegExp } from 'regexpert';
import { BibleTranslateName } from 'shared/model/bible';

export interface IBibleBroadcastSearchRequest {
  term: string;
  booki: BibleBooki;
  chapteri: BibleChapteri;
  listenScope: BibleBroadcastKeyListenScope;
  showTranslates: BibleTranslateName[];
  maxItems: number;
}

export type BibleBroadcastSearchResponse = { list: BibleBroadcastSingleAddress[]; splitReg: StrRegExp };
