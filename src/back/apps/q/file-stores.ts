import { FileStore } from 'back/complect/FileStore';
import { QuestionerBlank, QuestionerBlankWid, QuestionerUserAnswer } from 'shared/model/q';

export const questionerBlanksFileStore = new FileStore<PRecord<QuestionerBlankWid, OmitOwn<QuestionerBlank, 'w'>>>(
  '/apps/q/blanks.json',
  {},
);
export const questionerUserAnswersFileStore = new FileStore<
  PRecord<QuestionerBlankWid, { answers: QuestionerUserAnswer[] }>
>('/apps/q/answers.json', {});
