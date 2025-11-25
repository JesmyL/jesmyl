import { atom } from 'atomaric';
import { IndexNounPronsRedactorWordRedactor } from '../sub-ui/WordRedactor';

const pronAtom = atom('', 'index:twice-pron');

export const IndexNounPronsRedactorPronRedactor = () => {
  return (
    <>
      <div>Прилагательное (как стена{'<'}белый)</div>
      <IndexNounPronsRedactorWordRedactor
        atom={pronAtom}
        wirdKey="pron"
      />
    </>
  );
};
