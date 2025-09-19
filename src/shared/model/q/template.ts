import { QuestionerAnswerMi, QuestionerTemplateMi, QuestionerType } from './enums';

type QuestionerT_A = {
  radio: Implement<
    {
      type: QuestionerType.Radio;
      vari: AnswerVariant[];
    },
    QuestionerAnswerMi[]
  >;

  check: Implement<
    {
      type: QuestionerType.Check;
      vari: AnswerVariant[];
    },
    QuestionerAnswerMi
  >;
  comment: Implement<
    {
      type: QuestionerType.Comment;
    },
    string
  >;
};

type ExtractTemplate<T extends { template: unknown }> = T['template'];
type ExtractAnswer<T extends { answer: unknown }> = T['answer'];

export type QuestionerTemplate = ExtractTemplate<QuestionerT_A[keyof QuestionerT_A]>;
export type QuestionerAnswer = ExtractAnswer<QuestionerT_A[keyof QuestionerT_A]>;

/////////////////////////////
/////////////////////////////
export type QuestionerRadioTemplate = ExtractTemplate<QuestionerT_A['radio']>;
export type QuestionerRadioAnswer = ExtractAnswer<QuestionerT_A['radio']>;

export type QuestionerCheckTemplate = ExtractTemplate<QuestionerT_A['check']>;
export type QuestionerCheckAnswer = ExtractAnswer<QuestionerT_A['check']>;

export type QuestionerCommentTemplate = ExtractTemplate<QuestionerT_A['comment']>;
export type QuestionerCommentAnswer = ExtractAnswer<QuestionerT_A['comment']>;
/////////////////////////////
/////////////////////////////

type TemplateDefaults = {
  req?: 1;
  mi: QuestionerTemplateMi;
};

type Answer<AnswerValue> = {
  /** answer value */
  v: AnswerValue;
  /** comment */
  cm?: string;
};

type Implement<
  T extends {
    type: QuestionerType;
  },
  AnswerValue,
> = {
  template: T & TemplateDefaults;
  answer: Answer<AnswerValue>;
};

type AnswerVariant = {
  mi: QuestionerAnswerMi;
  title: string;
  /** correct variant mark */
  cv?: 1;
};
