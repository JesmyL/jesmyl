import { checkIsNotNil } from 'shared/utils/checkIs';
import { ruUaReg_i } from 'shared/utils/cm/com/const';
import { CmCat } from '../Cat';
import { CmComTexts } from './parents/40-Texts';

export class CmCom extends CmComTexts {
  getVowelPositions(textLine: string) {
    const R = [];
    for (let i = 0; i < textLine.length; i++) if (ruUaReg_i.test(textLine[i])) R.push(i);
    return R;
  }

  catMentions(cats: CmCat[] | nil) {
    if (!cats) return [];

    const wid = this.wid;
    const mentions: string[] = [];

    cats.forEach(cat => {
      const nativeNum = cat.dict[wid];

      if (checkIsNotNil(nativeNum)) mentions.push(`${cat.name} ${nativeNum}`);
      else if (cat.hasCom(this.top)) mentions.push(cat.name);
    });

    return mentions;
  }
}
