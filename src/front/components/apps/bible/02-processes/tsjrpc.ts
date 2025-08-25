import { TsjrpcClient } from '#basis/lib/Tsjrpc.client';
import { TsjrpcBaseClient } from '#basis/lib/TsjrpcBase.client';
import { bibleMyTranslatesAtom } from '$bible/basis/lib/store/atoms';
import { bibleTranslatesIDB } from '$bible/basis/lib/store/bibleIDB';
import { BibleTranslate } from '$bible/basis/model/base';
import { BibleTsjrpcBaseModel, BibleTsjrpcModel } from 'shared/api/tsjrpc/bible/tsjrpc.model';

export const bibleTsjrpcClient = new (class Bible extends TsjrpcClient<BibleTsjrpcModel> {
  constructor() {
    super({
      scope: 'Bible',
      methods: {
        requestFreshes: true,
        requestTranslate: true,
      },
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

          await bibleTranslatesIDB.set[tName](translate);
          await bibleTranslatesIDB.updateLastModifiedAt(modifiedAt);

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
