import { backConfig } from 'back/config/backConfig';
import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import fs from 'fs';
import { BibleTranslateName } from 'shared/api';
import { BibleSokiInvocatorBaseModel, BibleSokiInvocatorModel } from 'shared/api/invocators/bible/invocators.model';

const makeTranslateFileName = (tName: BibleTranslateName) =>
  `${__dirname}${backConfig.fileStoreDir}/apps/bible/${tName}.json`;

class BibleSokiInvocatorBaseServer extends SokiInvocatorBaseServer<BibleSokiInvocatorModel> {}
export const bibleSokiInvocatorBaseServer = new BibleSokiInvocatorBaseServer('BibleSokiInvocatorBaseServer', {
  requestFreshes:
    ({ client }) =>
    async (lastModifiedAt, myTranslates) => {
      myTranslates.forEach(tName => {
        try {
          const modifiedAt = fs.statSync(makeTranslateFileName(tName)).mtimeMs;
          if (lastModifiedAt >= modifiedAt) return;

          bibleSokiInvocatorServer.refreshTranslate(
            client,
            tName,
            '' + fs.readFileSync(makeTranslateFileName(tName)),
            modifiedAt,
          );
        } catch (_error) {
          //
        }
      });
    },
  requestTranslate:
    ({ client }) =>
    async tName => {
      const modifiedAt = fs.statSync(makeTranslateFileName(tName)).mtimeMs;

      await bibleSokiInvocatorServer.refreshTranslate(
        client,
        tName,
        '' + fs.readFileSync(makeTranslateFileName(tName)),
        modifiedAt,
      );
    },
});

class BibleSokiInvocatorServer extends SokiInvocatorServer<BibleSokiInvocatorBaseModel> {}
export const bibleSokiInvocatorServer = new BibleSokiInvocatorServer('BibleSokiInvocatorServer', {
  refreshTranslate: true,
});
