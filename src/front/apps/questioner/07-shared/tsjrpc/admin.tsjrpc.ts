import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { TsjrpcBaseClient } from '#basis/tsjrpc/TsjrpcBase.client';
import { QuestionerAdminTsjrpcModel } from 'shared/api/tsjrpc/q/admin.tsjrpc.model';
import { QuestionerAdminShareTsjrpcModel } from 'shared/api/tsjrpc/q/admin.tsjrpc.share.model';
import { questionerIDB } from '../state/qIdb';

export const questionerAdminTsjrpcClientBase =
  new (class Questioner extends TsjrpcBaseClient<QuestionerAdminShareTsjrpcModel> {
    constructor() {
      super({
        scope: 'QuestionerAdminShare',
        methods: {
          updateBlanks: async ({ blanks, maxMod }) => {
            questionerIDB.tb.blanks.bulkPut(blanks);
            questionerIDB.updateLastModifiedAt(maxMod);
          },
        },
      });
    }
  })();

questionerAdminTsjrpcClientBase.$$register();

export const questionerAdminTsjrpcClient = new (class Questioner extends TsjrpcClient<QuestionerAdminTsjrpcModel> {
  constructor() {
    super({
      scope: 'QuestionerAdmin',
    });
  }
})();
