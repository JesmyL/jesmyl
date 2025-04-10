import { backConfig } from 'back/config/backConfig';
import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import fs from 'fs';
import { BibleTranslateName } from 'shared/api';
import { BibleSokiInvocatorBaseModel, BibleSokiInvocatorModel } from 'shared/api/invocators/bible/invocators.model';

const makeTranslateFileName = (tName: BibleTranslateName) =>
  `${__dirname}${backConfig.fileStoreDir}/apps/bible/${tName}.json`;

export const bibleSokiInvocatorBaseServer = new (class Bible extends SokiInvocatorBaseServer<BibleSokiInvocatorModel> {
  constructor() {
    super({
      scope: 'Bible',
      beforeEachTools: {
        requestFreshes: { minLevel: 0 },
        requestTranslate: { minLevel: 0 },
      },
      methods: {
        requestFreshes: async ({ lastModifiedAt, myTranslates }, { client }) => {
          myTranslates.forEach(tName => {
            try {
              const modifiedAt = fs.statSync(makeTranslateFileName(tName)).mtimeMs;
              if (lastModifiedAt >= modifiedAt) return;

              bibleSokiInvocatorServer.refreshTranslate(
                {
                  tName: tName,
                  stringifiedTranslate: '' + fs.readFileSync(makeTranslateFileName(tName)),
                  modifiedAt: modifiedAt,
                },
                client,
              );
            } catch (_error) {
              //
            }
          });
        },
        requestTranslate: async ({ translate: tName }, { client }) => {
          const modifiedAt = fs.statSync(makeTranslateFileName(tName)).mtimeMs;

          await bibleSokiInvocatorServer.refreshTranslate(
            {
              tName: tName,
              stringifiedTranslate: '' + fs.readFileSync(makeTranslateFileName(tName)),
              modifiedAt: modifiedAt,
            },

            client,
          );
        },
      },
    });
  }
})();

export const bibleSokiInvocatorServer = new (class Bible extends SokiInvocatorServer<BibleSokiInvocatorBaseModel> {
  constructor() {
    super({
      scope: 'Bible',
      methods: {
        refreshTranslate: true,
      },
    });
  }
})();
