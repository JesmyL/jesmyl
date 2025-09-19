import { FileStore } from 'back/complect/FileStore';
import { SokiAuthLogin } from 'shared/api';
import { QuestionerAnswer, QuestionerBlank, QuestionerBlankWid } from 'shared/model/q';

export const questionerBlanksFileStore = new FileStore<PRecord<QuestionerBlankWid, OmitOwn<QuestionerBlank, 'w'>>>(
  '/apps/q/blanks.json',
  {},
);
export const questionerAnswersFileStore = new FileStore<
  PRecord<QuestionerBlankWid, PRecord<SokiAuthLogin, QuestionerAnswer>>
>('/apps/q/answers.json', {});
