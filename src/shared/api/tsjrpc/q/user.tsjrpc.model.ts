import { QuestionerBlank, QuestionerBlankSelector } from 'shared/model/q';
import { QuestionerUserAnswer } from 'shared/model/q/answer';

export type QuestionerUserTsjrpcModel = {
  getUserBlank: (args: QuestionerBlankSelector) => OmitOwn<QuestionerBlank, 'team'> | null;
  getUserAnswers: (args: QuestionerBlankSelector) => QuestionerUserAnswer[];
  publicUserAnswer: (args: QuestionerBlankSelector<{ answer: QuestionerUserAnswer }>) => void;
};
