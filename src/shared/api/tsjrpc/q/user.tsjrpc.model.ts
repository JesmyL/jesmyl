import { QuestionerBlank, QuestionerBlankSelector } from 'shared/model/q';
import { QuestionerUserAnswer } from 'shared/model/q/answer';

export type QuestionerUserTsjrpcModel = {
  getUserBlank: (args: QuestionerBlankSelector) => OmitOwn<QuestionerBlank, 'team'> | nil;
  getUserAnswers: (args: QuestionerBlankSelector) => QuestionerUserAnswer[] | nil;
  publicUserAnswer: (args: QuestionerBlankSelector<{ answer: QuestionerUserAnswer }>) => void;
};
