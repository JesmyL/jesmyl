import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { TsjrpcBaseClient } from '#basis/tsjrpc/TsjrpcBase.client';
import { bibleMyTranslatesAtom } from '$bible/ext';
import { BibleTsjrpcBaseModel, BibleTsjrpcModel } from 'shared/api/tsjrpc/bible/tsjrpc.model';
import { BibleTbcvKey } from 'shared/model/bible';
import { BibleTranslate } from '../model/base';
import { bibleTBCVTranslatesIDB } from '../state/bibleIDB';
import { takeBibleTranslateBookSizesAtom } from './takeBibleTranslateBookSizesAtom';
import { bibleTbcvEncode } from './tbcv.parser';

export const bibleTsjrpcClient = new (class Bible extends TsjrpcClient<BibleTsjrpcModel> {
  constructor() {
    super({
      scope: 'Bible',
    });
  }
})();

export const bibleTsjrpcBaseClient = new (class BibleTsjrpcBaseClient extends TsjrpcBaseClient<BibleTsjrpcBaseModel> {
  constructor() {
    super({
      scope: 'Bible',
      methods: {
        refreshTranslate: async ({ tName, stringifiedTranslate, modifiedAt }) => {
          const translate: BibleTranslate = JSON.parse(stringifiedTranslate);

          const recordsToInsert: { k: BibleTbcvKey; v: string }[] = [];
          const bookSizesNet: number[][] = [];

          translate.chapters.forEach((book, booki) => {
            if (!book) return;
            bookSizesNet[booki] = [];

            book.forEach((chapter, chapteri) => {
              if (!chapter) return;

              bookSizesNet[booki][chapteri] = chapter.length;

              chapter.forEach((verse, versei) => {
                recordsToInsert.push({
                  k: bibleTbcvEncode(tName, booki, chapteri, versei),
                  v: verse || '',
                });
              });
            });
          });

          takeBibleTranslateBookSizesAtom(tName).set(bookSizesNet);

          await bibleTBCVTranslatesIDB.tb.list.bulkPut(recordsToInsert);
          await bibleTBCVTranslatesIDB.updateLastModifiedAt(modifiedAt);

          const myTranslates = new Set(bibleMyTranslatesAtom.get());
          const prevSize = myTranslates.size;
          const addedSize = myTranslates.add(tName).size;

          if (prevSize !== addedSize) {
            bibleMyTranslatesAtom.set(Array.from(myTranslates));
          }
        },
      },
    });
  }
})();
