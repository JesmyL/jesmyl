import { QuestionerBlank, QuestionerBlankSelector } from './blank';
import { QuestionerTemplateTypeConditionDict } from './condition';
import { QuestionerAnswerId, QuestionerTemplateId, QuestionerType } from './enums';
import { QuestionerTemplateByItsType } from './template';

export type QuestionerUserAnswerValueBox = {
  [QuestionerType.Check]: {
    v: QuestionerAnswerId[];
    len: number;
  };
  [QuestionerType.Radio]: {
    v: QuestionerAnswerId;
    len: number;
  };
  [QuestionerType.Comment]: {
    v: string;
  };
  [QuestionerType.Sorter]: {
    v: QuestionerAnswerId[];
  };
  [QuestionerType.TextInclude]: {
    v: Record<string, string>;
  };
};

export type QuestionerUserAnswerContentProps<Type extends QuestionerType> = {
  template: QuestionerTemplateByItsType<Type>;
  userAnswer: QuestionerUserAnswerValueBox[Type] | nil;
  isCantRedact: boolean;
  onUpdate: (
    updater: (
      value: QuestionerUserAnswerValueBox[Type]['v'] | undefined,
    ) => QuestionerUserAnswerValueBox[Type]['v'] | undefined,
  ) => void;
};

export type QuestionerResultContentProps<Type extends QuestionerType> = {
  template: QuestionerTemplateByItsType<Type>;
  userAnswer: QuestionerUserAnswerValueBox[Type] | nil;
};

export type QuestionerConditionContentProps<Type extends QuestionerType> = {
  blank: QuestionerBlank;
  templateId: RKey<QuestionerTemplateId>;
  template: QuestionerTemplateByItsType<Type>;
  ifCondition: QuestionerTemplateTypeConditionDict[Type] | nil,
  operator: Exclude<QuestionerTemplateTypeConditionDict[Type]['op'], nil>,
  nexti: number,
  nextNexti: number,
};

export type QuestionerUserAnswer = {
  fio?: string;
  a: PRecord<QuestionerTemplateId, QuestionerUserAnswerValueBox[QuestionerType]>;
};

export type QuestionerAnswerVariant = {
  title: string;
};

export type QuestionerTemplateSelector<With = object> = QuestionerBlankSelector<
  With & {
    templateId: RKey<QuestionerTemplateId>;
  }
>;
