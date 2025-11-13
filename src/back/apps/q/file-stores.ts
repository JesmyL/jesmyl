import { DirStorage } from 'back/complect/DirStorage';
import { FileStore } from 'back/complect/FileStore';
import { QuestionerBlank, QuestionerBlankWid } from 'shared/model/q';
import { QuestionerUserAnswer } from 'shared/model/q/answer';

export const questionerBlanksDirStorage = new DirStorage<QuestionerBlank, QuestionerBlankWid>({
  dirPath: '/apps/q/blanks/',
  idKey: 'w',
  makeNewItem: () => ({
    dsc: '',
    m: Date.now(),
    ord: [],
    team: {},
    title: '',
    tmp: {},
    w: Date.now() + Math.random(),
  }),
}
);

export const questionerUserAnswersFileStore = new FileStore<
  PRecord<QuestionerBlankWid, { answers: QuestionerUserAnswer[] }>
>('/apps/q/userAnswers.json', {});
