import { backConfig } from 'back/config/backConfig';
import fs from 'fs';
import { BibleTranslateName } from 'shared/api';

export const makeBibleTranslateFileName = (tName: BibleTranslateName) =>
  `${__dirname}${backConfig.fileStoreDir}/apps/bible/${tName}.json`;

export const getBibleTranslateTexts = () => {
  return JSON.parse('' + fs.readFileSync(makeBibleTranslateFileName(BibleTranslateName.nrt))) as {
    chapters: string[][][];
  };
};
