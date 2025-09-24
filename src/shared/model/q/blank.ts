import { SokiAuthLogin } from 'shared/api';
import { QuestionerBlankRole, QuestionerBlankWid, QuestionerTemplateId } from './enums';
import { QuestionerTemplate } from './template';

export type QuestionerBlankUser = {
  fio: string;
  /** role */
  r: QuestionerBlankRole;
};

export type QuestionerBlank = {
  w: QuestionerBlankWid;
  m: number;
  title: string;
  dsc: string;
  anon?: 1;
  tmp: PRecord<QuestionerTemplateId, QuestionerTemplate>;
  ord: QuestionerTemplateId[];
  team: PRecord<SokiAuthLogin, QuestionerBlankUser>;
};

export type QuestionerBlankSelector<With = object> = With & {
  blankw: QuestionerBlankWid;
};
