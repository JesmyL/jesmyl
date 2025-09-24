import { FileStore } from 'back/complect/FileStore';
import { QuestionerBlank, QuestionerBlankWid } from 'shared/model/q';
import { QuestionerUserAnswer } from 'shared/model/q/answer';

export const questionerBlanksFileStore = new FileStore<PRecord<QuestionerBlankWid, OmitOwn<QuestionerBlank, 'w'>>>(
  '/apps/q/blanks.json',
  {},
);
export const questionerUserAnswersFileStore = new FileStore<
  PRecord<QuestionerBlankWid, { answers: QuestionerUserAnswer[] }>
>('/apps/q/userAnswers.json', {});
