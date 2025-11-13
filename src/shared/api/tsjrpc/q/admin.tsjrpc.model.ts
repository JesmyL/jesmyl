import {
  QuestionerAnswerId,
  QuestionerBlank,
  QuestionerBlankSelector,
  QuestionerTemplateId,
  QuestionerTemplateSelector,
  QuestionerType,
} from 'shared/model/q';
import { QuestionerTemplateConditionType, QuestionerTemplateTypeConditionDict } from 'shared/model/q/condition';

export type QuestionerAdminTsjrpcModel = {
  requestFreshes: (args: { lastModfiedAt: number }) => void,
  createBlank: () => QuestionerBlank;
  addBlankTemplate: (args: QuestionerBlankSelector<{ type: QuestionerType }>) => QuestionerBlank;

  getAdminBlank: (args: QuestionerBlankSelector) => QuestionerBlank | null;

  changeBlankTitle: (args: QuestionerBlankSelector<{ value: string }>) => void;
  changeBlankDescription: (args: QuestionerBlankSelector<{ value: string }>) => void;
  switchBlankIsAnonymous: (args: QuestionerBlankSelector) => void;

  changeTemplateTitle: (args: QuestionerTemplateSelector<{ value: string }>) => void;
  changeTemplateDescription: (args: QuestionerTemplateSelector<{ value: string }>) => void;
  changeTemplateRequiredSign: (args: QuestionerTemplateSelector<{ value: boolean }>) => void;
  changeTemplatePosition: (args: QuestionerTemplateSelector) => void;
  switchTemplateHiddenSign: (args: QuestionerTemplateSelector) => void;
  setTemplateConditionOperator: (args: QuestionerTemplateSelector<{ operator: QuestionerTemplateConditionType, nexti?: number }>) => void;
  setTemplateConditionNextTemplateId: (args: QuestionerTemplateSelector<{ conditionTemplateId: QuestionerTemplateId, nexti: number, nextNexti: number }>) => void;
  setTemplateConditionNextValue: (args: QuestionerTemplateSelector<{
    match: Partial<{ [T in QuestionerType]: Partial<{ [O in Exclude<QuestionerTemplateTypeConditionDict[T]['op'], nil>]: Exclude<QuestionerTemplateTypeConditionDict[T]['val'], nil> }> }>,
    nexti: number,
    nextNexti: number,
  }>) => void;
  setTemplateConditionNextOperator: (args: QuestionerTemplateSelector<{
    match: Partial<{ [T in QuestionerType]: Exclude<QuestionerTemplateTypeConditionDict[T]['op'], nil> }>,
    nexti: number,
    nextNexti: number,
  }>) => void;
  addTemplateConditionNext: (args: QuestionerTemplateSelector) => void;
  addTemplateConditionNextNext: (args: QuestionerTemplateSelector<{ nexti: number }>) => void;
  removeTemplateCondition: (args: QuestionerTemplateSelector<{ nexti: number, nextNexti?: number }>) => void;
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
