import { SokiAuthLogin } from 'shared/api';
import { QuestionerBlankRole, QuestionerBlankWid, QuestionerTemplateMi } from './enums';
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
  tmp: QuestionerTemplate[];
  /** template **order** by TemplateId */
  o: QuestionerTemplateMi[];
  /** last used index */
  li: number;
  team: PRecord<SokiAuthLogin, QuestionerBlankUser>;
};
