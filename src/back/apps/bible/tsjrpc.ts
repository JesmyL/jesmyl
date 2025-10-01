import { backConfig } from 'back/config/backConfig';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { TsjrpcServerMethods } from 'back/tsjrpc.server';
import fs from 'fs';
import { BibleTranslateName } from 'shared/api';
import { BibleTsjrpcBaseModel, BibleTsjrpcModel } from 'shared/api/tsjrpc/bible/tsjrpc.model';

const makeTranslateFileName = (tName: BibleTranslateName) =>
  `${__dirname}${backConfig.fileStoreDir}/apps/bible/${tName}.json`;

export const bibleTsjrpcBaseServer = new (class Bible extends TsjrpcBaseServer<BibleTsjrpcModel> {
  constructor() {
    super({
      scope: 'Bible',
      methods: {
        requestFreshes: async ({ lastModifiedAt, myTranslates }, { client }) => {
          myTranslates.forEach(tName => {
            try {
              const modifiedAt = fs.statSync(makeTranslateFileName(tName)).mtimeMs;
              if (lastModifiedAt >= modifiedAt) return;

              bibleTsjrpcServer.refreshTranslate(
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

          await bibleTsjrpcServer.refreshTranslate(
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

export const bibleTsjrpcServer = new (class Bible extends TsjrpcServerMethods<BibleTsjrpcBaseModel> {
  constructor() {
    super({
      scope: 'Bible',
      methods: {
        refreshTranslate: true,
      },
    });
  }
})();
