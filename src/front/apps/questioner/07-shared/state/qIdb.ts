import { DexieDB } from "#shared/lib/DexieDB"
import { QuestionerBlank } from "shared/model/q";

type QuestionerStorage = {
    lastModifiedAt: number
    blanks: QuestionerBlank[];
}

class QuestionerIDB extends DexieDB<QuestionerStorage> {
    constructor() {
        super('questioner', {
            lastModifiedAt: { $byDefault: 0 },
            blanks: { w: '++' }
        })
    }
}

export const questionerIDB = new QuestionerIDB();