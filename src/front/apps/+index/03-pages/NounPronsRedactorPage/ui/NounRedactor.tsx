import { Atom, atom } from 'atomaric';
import { IndexNounPronsRedactorWordRedactor } from '../sub-ui/WordRedactor';

let nounAtom: Atom<string>;

export const IndexNounPronsRedactorNounRedactor = () => {
  nounAtom ??= atom('', 'index:twice-noun');

  return (
    <>
      <div>Существительное (М! Ж: Ср. мн, "к)</div>
      <IndexNounPronsRedactorWordRedactor
        atom={nounAtom}
        wordKey="noun"
      />
    </>
  );
};
