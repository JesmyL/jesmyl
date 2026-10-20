import { translateBase } from '#basis/locale';
import { Atom, atom } from 'atomaric';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { IndexNounPronsRedactorWordRedactor } from '../sub-ui/WordRedactor';

let pronAtom: Atom<string>;

export const IndexNounPronsRedactorPronRedactor = () => {
  pronAtom ??= atom('', 'index:twice-pron');

  return (
    <>
      <div>{translateBase(BaseLocaleKey.IndexPronoun)}</div>
      <IndexNounPronsRedactorWordRedactor
        atom={pronAtom}
        wordKey="pron"
        checkIsDisabled={term => !term.endsWith('й') && !term.endsWith('йся')}
      />
    </>
  );
};
