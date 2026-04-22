import { makeBibleTranslateFileName } from 'back/complect/lib/make-bible-texts';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { TsjrpcServerMethods } from 'back/tsjrpc.server';
import fs from 'fs';
import { BibleTsjrpcBaseModel, BibleTsjrpcModel } from 'shared/api/tsjrpc/bible/tsjrpc.model';

export const bibleTsjrpcBaseServer = new (class Bible extends TsjrpcBaseServer<BibleTsjrpcModel> {
  constructor() {
    super({
      scope: 'Bible',
      methods: {
        requestFreshes: async ({ lastModifiedAt, myTranslates }, { client }) => {
          myTranslates.forEach(tName => {
            try {
              const modifiedAt = fs.statSync(makeBibleTranslateFileName(tName)).mtimeMs;
              if (lastModifiedAt >= modifiedAt) return;

              bibleTsjrpcServer.refreshTranslate(
                {
                  tName: tName,
                  stringifiedTranslate: '' + fs.readFileSync(makeBibleTranslateFileName(tName)),
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
          const modifiedAt = fs.statSync(makeBibleTranslateFileName(tName)).mtimeMs;

          await bibleTsjrpcServer.refreshTranslate(
            {
              tName: tName,
              stringifiedTranslate: '' + fs.readFileSync(makeBibleTranslateFileName(tName)),
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
    });
  }
})();
