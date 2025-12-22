import { DexieDB } from '#shared/lib/DexieDB';
import { QuestionerBlank } from 'shared/model/q';

type QuestionerStorage = {
  lastModifiedAt: number;
  blanks: QuestionerBlank[];
};

class QuestionerIDB extends DexieDB<QuestionerStorage> {
  constructor() {
    super('questioner', {
      lastModifiedAt: [0],
      blanks: { w: '++' },
    });
  }
}

export const questionerIDB = new QuestionerIDB();
