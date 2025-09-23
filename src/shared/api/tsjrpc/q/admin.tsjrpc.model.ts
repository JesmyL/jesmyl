import {
  QuestionerAnswerId,
  QuestionerBlank,
  QuestionerBlankSelector,
  QuestionerTemplateSelector,
  QuestionerType,
  QuestionerUserAnswer,
} from 'shared/model/q';

export type QuestionerAdminTsjrpcModel = {
  createBlank: () => QuestionerBlank;
  addBlankTemplate: (args: QuestionerBlankSelector<{ type: QuestionerType }>) => QuestionerBlank;

  getAdminBlanks: () => QuestionerBlank[];
  getAdminBlank: (args: QuestionerBlankSelector) => QuestionerBlank | nil;
  getUserBlank: (args: QuestionerBlankSelector) => OmitOwn<QuestionerBlank, 'team'> | nil;
  getUserAnswers: (args: QuestionerBlankSelector) => QuestionerUserAnswer[] | nil;
  publicUserAnswer: (args: QuestionerBlankSelector<{ answer: QuestionerUserAnswer }>) => void;

  changeBlankTitle: (args: QuestionerBlankSelector<{ value: string }>) => void;
  changeBlankDescription: (args: QuestionerBlankSelector<{ value: string }>) => void;
  switchBlankIsAnonymous: (args: QuestionerBlankSelector) => void;
  changeTemplateTitle: (args: QuestionerTemplateSelector<{ value: string }>) => void;
  changeTemplateDescription: (args: QuestionerTemplateSelector<{ value: string }>) => void;
  changeTemplateRequiredSign: (args: QuestionerTemplateSelector<{ value: boolean }>) => void;
  switchTemplateHiddenSign: (args: QuestionerTemplateSelector) => void;
  changeTemplateRandomSortSign: (args: QuestionerTemplateSelector<{ value: boolean }>) => void;
  changeTemplateMinSign: (args: QuestionerTemplateSelector<{ value: number }>) => void;
  changeTemplateMaxSign: (args: QuestionerTemplateSelector<{ value: number }>) => void;
  changeTemplateCorrectAnswerSign: (args: QuestionerTemplateSelector<{ answerId: QuestionerAnswerId }>) => void;
  changeTemplateAboveText: (args: QuestionerTemplateSelector<{ text: string }>) => void;
  changeTemplateBelowText: (args: QuestionerTemplateSelector<{ text: string }>) => void;
  changeTemplateAnswerVariantTitle: (
    args: QuestionerTemplateSelector<{ answerId: RKey<QuestionerAnswerId>; value: string }>,
  ) => void;
  addTemplateAnswerVariant: (args: QuestionerTemplateSelector) => void;
};
