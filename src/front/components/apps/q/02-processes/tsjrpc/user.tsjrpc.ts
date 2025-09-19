import { TsjrpcClient } from '#basis/lib/Tsjrpc.client';
import { QuestionerUserTsjrpcModel } from 'shared/api/tsjrpc/q/user.tsjrpc.model';

export const questionerUsetTsjrpcClient = new (class Questioner extends TsjrpcClient<QuestionerUserTsjrpcModel> {
  constructor() {
    super({
      scope: 'QuestionerUser',
      methods: {
        getAvailableQuestions: true,
      },
    });
  }
})();
