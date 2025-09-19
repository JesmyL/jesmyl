import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { questionerUsetTsjrpcClient } from '$q/processes/tsjrpc/user.tsjrpc';

export const QuestionerAnswersPage = () => {
  questionerUsetTsjrpcClient.getAvailableQuestions();

  return (
    <PageContainerConfigurer
      className="QuestionerAnswersPage"
      headTitle="Мои ответы"
      withoutBackButton
      content={<></>}
    />
  );
};
