import { QuestionerBlank, QuestionerBlankSelector, QuestionerUserAnswer } from 'shared/model/q';

export type QuestionerUserTsjrpcModel = {
  getUserBlank: (args: QuestionerBlankSelector) => OmitOwn<QuestionerBlank, 'team'> | nil;
  getUserAnswers: (args: QuestionerBlankSelector) => QuestionerUserAnswer[] | nil;
  publicUserAnswer: (args: QuestionerBlankSelector<{ answer: QuestionerUserAnswer }>) => void;
};
