import { atom } from 'atomaric';
import { IndexNounPronsRedactorWordRedactor } from '../sub-ui/WordRedactor';

const nounAtom = atom('', 'index:twice-noun');

export const IndexNounPronsRedactorNounRedactor = () => {
  return (
    <>
      <div>Существительное (М! Ж: Ср. мн, "к)</div>
      <IndexNounPronsRedactorWordRedactor
        atom={nounAtom}
        wirdKey="noun"
      />
    </>
  );
};
