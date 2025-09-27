import {
  QuestionerAnswerId,
  QuestionerBlank,
  QuestionerBlankSelector,
  QuestionerTemplateSelector,
  QuestionerType,
} from 'shared/model/q';

export type QuestionerAdminTsjrpcModel = {
  createBlank: () => QuestionerBlank;
  addBlankTemplate: (args: QuestionerBlankSelector<{ type: QuestionerType }>) => QuestionerBlank;

  getAdminBlanks: () => QuestionerBlank[];
  getAdminBlank: (args: QuestionerBlankSelector) => QuestionerBlank | null;

  changeBlankTitle: (args: QuestionerBlankSelector<{ value: string }>) => void;
  changeBlankDescription: (args: QuestionerBlankSelector<{ value: string }>) => void;
  switchBlankIsAnonymous: (args: QuestionerBlankSelector) => void;
  changeTemplateTitle: (args: QuestionerTemplateSelector<{ value: string }>) => void;
  changeTemplateDescription: (args: QuestionerTemplateSelector<{ value: string }>) => void;
  changeTemplateRequiredSign: (args: QuestionerTemplateSelector<{ value: boolean }>) => void;
  changeTemplatePosition: (args: QuestionerTemplateSelector) => void;
  switchTemplateHiddenSign: (args: QuestionerTemplateSelector) => void;
  changeTemplateRandomSortSign: (args: QuestionerTemplateSelector<{ value: boolean }>) => void;
  changeTemplateMinSign: (args: QuestionerTemplateSelector<{ value: number }>) => void;
  changeTemplateMaxSign: (args: QuestionerTemplateSelector<{ value: number }>) => void;
  changeTemplateCorrectAnswerSign: (args: QuestionerTemplateSelector<{ answerId: QuestionerAnswerId }>) => void;
  changeTemplateCorrectAnswerIndex: (args: QuestionerTemplateSelector<{ answerId: QuestionerAnswerId }>) => void;
  changeTemplateAboveText: (args: QuestionerTemplateSelector<{ text: string }>) => void;
  changeTemplateBelowText: (args: QuestionerTemplateSelector<{ text: string }>) => void;
  switchTemplateNoCorrectsSign: (args: QuestionerTemplateSelector) => void;
  switchTemplateNeedSelectSign: (args: QuestionerTemplateSelector) => void;
  switchTemplateSymbolExistance: (args: QuestionerTemplateSelector<{ symbol: string }>) => void;
  switchTemplateTextValue: (args: QuestionerTemplateSelector<{ text: string }>) => void;
  addTemplateTextValue: (args: QuestionerTemplateSelector) => void;
  changeTemplateTextValue: (args: QuestionerTemplateSelector<{ texti: number; text: string }>) => void;
  switchTemplateReplacementTextValue: (
    args: QuestionerTemplateSelector<{ textValue: string; textCode: string }>,
  ) => void;
  changeTemplateAnswerVariantTitle: (
    args: QuestionerTemplateSelector<{ answerId: RKey<QuestionerAnswerId>; value: string }>,
  ) => void;
  addTemplateAnswerVariant: (args: QuestionerTemplateSelector) => void;
};
