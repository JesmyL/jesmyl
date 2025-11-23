import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { QuestionerUserTsjrpcModel } from 'shared/api/tsjrpc/q/user.tsjrpc.model';

export const questionerUserTsjrpcClient = new (class Questioner extends TsjrpcClient<QuestionerUserTsjrpcModel> {
  constructor() {
    super({
      scope: 'QuestionerUser',
    });
  }
})();
