import { QuestionerAnswerVariant } from './answer';
import { QuestionerBlank, QuestionerBlankSelector } from './blank';
import { QuestionerAnswerId, QuestionerTemplateId, QuestionerType } from './enums';

type QuestionerTemplateBox = {
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

export type QuestionerTemplate = QuestionerTemplateBox[QuestionerType];
export type QuestionerTemplateByItsType<Type extends QuestionerType> = QuestionerTemplateBox[Type];

export type QuestionerAdminTemplateContentProps<Type extends QuestionerType> = {
  blank: QuestionerBlank;
  template: QuestionerTemplateByItsType<Type>;
  templateId: RKey<QuestionerTemplateId>;
  onUpdate: () => void;
};

/////////////////////////////
/////////////////////////////

type QuestionerVariantedTemplate = {
  variants: PRecord<QuestionerAnswerId, QuestionerAnswerVariant>;
};

export type QuestionerRadioTemplate = QuestionerTemplateBox[QuestionerType.Radio];
export type QuestionerCheckTemplate = QuestionerTemplateBox[QuestionerType.Check];
export type QuestionerCommentTemplate = QuestionerTemplateBox[QuestionerType.Comment];
export type QuestionerSorterTemplate = QuestionerTemplateBox[QuestionerType.Sorter];
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

export type QuestionerTemplateSelector<With = object> = QuestionerBlankSelector<
  With & {
    templateId: RKey<QuestionerTemplateId>;
  }
>;
