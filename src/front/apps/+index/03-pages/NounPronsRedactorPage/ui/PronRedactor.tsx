import { Atom, atom } from 'atomaric';
import { IndexNounPronsRedactorWordRedactor } from '../sub-ui/WordRedactor';

let pronAtom: Atom<string>;

export const IndexNounPronsRedactorPronRedactor = () => {
  pronAtom ??= atom('', 'index:twice-pron');

  return (
    <>
      <div>Прилагательное (как стена{'<'}белый)</div>
      <IndexNounPronsRedactorWordRedactor
        atom={pronAtom}
        wordKey="pron"
        checkIsDisabled={term => !term.endsWith('й') && !term.endsWith('йся')}
      />
    </>
  );
};
