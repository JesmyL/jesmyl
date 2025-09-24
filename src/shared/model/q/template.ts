import { QuestionerBlank, QuestionerBlankSelector } from './blank';
import { QuestionerAnswerId, QuestionerTemplateId, QuestionerType } from './enums';

type QuestionerT_A = {
  [QuestionerType.Radio]: Implement<
    {
      type: QuestionerType.Radio;
      correct?: QuestionerAnswerId;
      /** is random sort variants  */
      rSort?: 1;
    } & QuestionerVariantedTemplate
  >;

  [QuestionerType.Check]: Implement<
    {
      type: QuestionerType.Check;
      correct?: QuestionerAnswerId[];
      min?: number;
      max?: number;
      /** is random sort variants  */
      rSort?: 1;
    } & QuestionerVariantedTemplate
  >;
  [QuestionerType.Comment]: Implement<{
    type: QuestionerType.Comment;
    correct?: string;
  }>;
  [QuestionerType.Sorter]: Implement<{
    type: QuestionerType.Sorter;
    correct?: QuestionerAnswerId[];
    above?: string;
    below?: string;
    noCorrect?: 1;
  }> &
    QuestionerVariantedTemplate;
};

export type QuestionerTemplate = QuestionerT_A[QuestionerType];
export type QuestionerTemplateByItsType<Type extends QuestionerType> = QuestionerT_A[Type];

export type QuestionerAdminTemplateContentProps<Type extends QuestionerType> = {
  blank: QuestionerBlank;
  template: QuestionerTemplateByItsType<Type>;
  templateId: RKey<QuestionerTemplateId>;
  onUpdate: () => void;
};

export type QuestionerUserAnswerContentProps<Type extends QuestionerType> = {
  template: QuestionerTemplateByItsType<Type>;
  userAnswer: QuestionerTemplateByItsType<Type>['correct'];
  onUpdate: (
    updater: (value: QuestionerTemplateByItsType<Type>['correct']) => QuestionerTemplateByItsType<Type>['correct'],
  ) => void;
};

export type QuestionerUserAnswerResultContentProps<Type extends QuestionerType> = {
  template: QuestionerTemplateByItsType<Type>;
  userAnswer: QuestionerTemplateByItsType<Type>['correct'];
};

/////////////////////////////
/////////////////////////////

type QuestionerVariantedTemplate = {
  variants: PRecord<QuestionerAnswerId, AnswerVariant>;
};

export type QuestionerRadioTemplate = QuestionerT_A[QuestionerType.Radio];
export type QuestionerCheckTemplate = QuestionerT_A[QuestionerType.Check];
export type QuestionerCommentTemplate = QuestionerT_A[QuestionerType.Comment];
export type QuestionerSorterTemplate = QuestionerT_A[QuestionerType.Sorter];
/////////////////////////////
/////////////////////////////

type TemplateDefaults = {
  title?: string;
  dsc?: string;
  req?: 1;
  hidden?: 1;
  correct?: unknown;
};

type Implement<
  T extends {
    type: QuestionerType;
    correct?: unknown;
  },
> = T & TemplateDefaults;

export type QuestionerUserAnswer = {
  fio?: string;
  answ: PRecord<QuestionerTemplateId, unknown>;
};

type AnswerVariant = {
  title: string;
};

export type QuestionerTemplateSelector<With = object> = QuestionerBlankSelector<
  With & {
    templateId: RKey<QuestionerTemplateId>;
  }
>;
