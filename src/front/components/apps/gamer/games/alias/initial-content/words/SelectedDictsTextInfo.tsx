import { mylib } from 'front/utils';
import { useAliasPacks } from '../../molecules';

export const levelGradationTitles = [
  'Не выбрано',
  'Лёгкий',
  'Средний',
  'Сложный',
  'Очень сложный',
  'Профессорский',
  'Космический',
  'Галактический',
];

interface Props {
  dicts: number[];
}

const nounProns = { nouns: [] };

export const AliasSelectedDictsTextInfo = ({ dicts }: Props) => {
  const packs = useAliasPacks();
  // const nounProns = useNounsPronounsLines();

  return (
    <>
      {'Словари - '}
      {dicts.length ? (
        dicts
          .map((level, leveli) => {
            return !level
              ? ''
              : packs[leveli].title +
                  ' (' +
                  (mylib.isNum(packs[leveli].words)
                    ? level < 0
                      ? nounProns.nouns.length
                      : level
                    : levelGradationTitles[level] +
                      (' - ' +
                        Object.values(packs[leveli].words).reduce((acc, num) => acc + +(num && num <= level), 0))) +
                  ' сл.)';
          })
          .filter(it => it)
          .join(' + ')
      ) : (
        <span className="color--ko">Не выбраны</span>
      )}
    </>
  );
};
