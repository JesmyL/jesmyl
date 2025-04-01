import { SokiInvocatorClient } from '#basis/lib/SokiInvocator.client';
import { SokiInvocatorBaseClient } from '#basis/lib/SokiInvocatorBase.client';
import { bibleIDB, bibleTranslatesIDB } from '$bible/basis/lib/bibleIDB';
import { BibleTranslate } from '$bible/basis/model/base';
import { BibleSokiInvocatorBaseModel, BibleSokiInvocatorModel } from 'shared/api/invocators/bible/invocators.model';

export const bibleSokiInvocatorClient =
  new (class BibleSokiInvocatorClient extends SokiInvocatorClient<BibleSokiInvocatorModel> {
    constructor() {
      super({
        className: 'BibleSokiInvocatorClient',
        methods: {
          requestFreshes: true,
          requestTranslate: true,
        },
      });
    }
  })();

export const bibleSokiInvocatorBaseClient =
  new (class BibleSokiInvocatorBaseClient extends SokiInvocatorBaseClient<BibleSokiInvocatorBaseModel> {
    constructor() {
      super({
        className: 'BibleSokiInvocatorBaseClient',
        methods: {
          refreshTranslate: async ({ tName, stringifiedTranslate, modifiedAt }) => {
            const translate: BibleTranslate = JSON.parse(stringifiedTranslate);

            await bibleTranslatesIDB.set[tName](translate);
            await bibleTranslatesIDB.updateLastModifiedAt(modifiedAt);

            const myTranslates = new Set(await bibleIDB.get.myTranslates());
            const prevSize = myTranslates.size;
            const addedSize = myTranslates.add(tName).size;

            if (prevSize !== addedSize) {
              bibleIDB.set.myTranslates(Array.from(myTranslates));
            }
          },
        },
      });
    }
  })();
