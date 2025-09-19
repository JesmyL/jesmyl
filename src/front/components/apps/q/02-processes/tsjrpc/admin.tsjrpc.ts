import { TsjrpcClient } from '#basis/lib/Tsjrpc.client';
import { QuestionerAdminTsjrpcModel } from 'shared/api/tsjrpc/q/admin.tsjrpc.model';

export const questionerAdminTsjrpcClient = new (class Questioner extends TsjrpcClient<QuestionerAdminTsjrpcModel> {
  constructor() {
    super({
      scope: 'QuestionerAdmin',
      methods: {
        getAdminBlanks: true,
        createBlank: true,
        getAdminBlank: true,
        addBlankTemplate: true,
      },
    });
  }
})();
