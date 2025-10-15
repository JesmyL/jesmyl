import { TsjrpcClient } from '#basis/lib/Tsjrpc.client';
import { TsjrpcBaseClient } from '#basis/lib/TsjrpcBase.client';
import { BibleTsjrpcBaseModel, BibleTsjrpcModel } from 'shared/api/tsjrpc/bible/tsjrpc.model';
import { BibleTranslate } from '../model/base';
import { bibleMyTranslatesAtom } from '../state/atoms';
import { bibleTranslatesIDB } from '../state/bibleIDB';

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
