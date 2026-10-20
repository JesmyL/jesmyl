import { translateBase } from '#basis/locale';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { QuestionerType } from 'shared/model/q';

export const questionerTemplateDescriptions: Record<QuestionerType, { title: string; dsc: string }> = {
  [QuestionerType.Check]: {
    get title() {
      return translateBase(BaseLocaleKey.QuestionerTemplateCheck);
    },
    get dsc() {
      return translateBase(BaseLocaleKey.QuestionerTemplateCheckDescription);
    },
  },
  [QuestionerType.Radio]: {
    get title() {
      return translateBase(BaseLocaleKey.QuestionerTemplateRadio);
    },
    get dsc() {
      return translateBase(BaseLocaleKey.QuestionerTemplateRadioDescription);
    },
  },
  [QuestionerType.Comment]: {
    get title() {
      return translateBase(BaseLocaleKey.QuestionerTemplateComment);
    },
    get dsc() {
      return translateBase(BaseLocaleKey.QuestionerTemplateCommentDescription);
    },
  },
  [QuestionerType.Sorter]: {
    get title() {
      return translateBase(BaseLocaleKey.QuestionerTemplateSorter);
    },
    get dsc() {
      return translateBase(BaseLocaleKey.QuestionerTemplateSorterDescription);
    },
  },
  [QuestionerType.TextInclude]: {
    get title() {
      return translateBase(BaseLocaleKey.QuestionerTemplateText);
    },
    get dsc() {
      return translateBase(BaseLocaleKey.QuestionerTemplateTextDescription);
    },
  },
};

export const questionerTemplateDescriptionsOrder = [
  QuestionerType.Check,
  QuestionerType.Radio,
  QuestionerType.Sorter,
  QuestionerType.TextInclude,
  QuestionerType.Comment,
];
