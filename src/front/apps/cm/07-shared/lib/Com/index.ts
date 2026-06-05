import { CmCat } from '$cm/ext';
import { ruUaReg_i } from 'shared/utils/cm/com/const';
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
    const natives: string[] = [];

    const inCats = cats
      .filter(cat => {
        if (cat.dict?.[wid] != null) natives.push(`${cat.name} ${cat.dict[wid]}`);
        return cat.stackSet.has(wid);
      })
      .map(cat => cat.name);

    return inCats.concat(natives);
  }
}
