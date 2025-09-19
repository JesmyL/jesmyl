import { QuestionerBlank, QuestionerBlankWid, QuestionerType } from 'shared/model/q';

export type QuestionerAdminTsjrpcModel = {
  getAdminBlanks: () => QuestionerBlank[];
  getAdminBlank: (args: { blankw: QuestionerBlankWid }) => QuestionerBlank | nil;
  addBlankTemplate: (args: { blankw: QuestionerBlankWid; type: QuestionerType }) => QuestionerBlank;
  createBlank: () => QuestionerBlank;
};
