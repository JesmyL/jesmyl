import { translateBase } from '#basis/locale';
import { Atom, atom } from 'atomaric';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { IndexNounPronsRedactorWordRedactor } from '../sub-ui/WordRedactor';

let nounAtom: Atom<string>;

export const IndexNounPronsRedactorNounRedactor = () => {
  nounAtom ??= atom('', 'index:twice-noun');

  return (
    <>
      <div>{translateBase(BaseLocaleKey.IndexNoun)}</div>
      <IndexNounPronsRedactorWordRedactor
        atom={nounAtom}
        wordKey="noun"
      />
    </>
  );
};
