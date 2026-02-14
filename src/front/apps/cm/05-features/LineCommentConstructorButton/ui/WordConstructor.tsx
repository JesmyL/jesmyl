import { Button } from '#shared/components';
import { cmComCommentTextDetectorCalculateRate } from '$cm/entities/com-comment';
import { useAtomValue } from 'atomaric';
import { cmLineCommentConstructorButtonRulePropsDictAtom } from '../state/atoms';
import { CmLineCommentConstructorButtonAccentKindRedactor } from './AccentKindRedactor';
import { CmLineCommentConstructorButtonBlockRedactor } from './BlockRedactor';
import { CmLineCommentConstructorButtonChordConstructor } from './ChordConstructor';

export const CmLineCommentConstructorButtonWordConstructor = ({ linei, wordi }: { linei: number; wordi: number }) => {
  const propsDict = useAtomValue(cmLineCommentConstructorButtonRulePropsDictAtom);

  return (
    <>
      <div className="rounded bg-x2 my-10 p-3">
        <div>Слово {wordi + 1}</div>

        <CmLineCommentConstructorButtonAccentKindRedactor
          blockPropsHolder={propsDict}
          blockKey={`l${linei}w${wordi}^`}
          getDefaultPropsDict={() => ({
            place: '^',
            kind: 0,
            linei,
            wordi,
            rate: cmComCommentTextDetectorCalculateRate(linei, wordi),
            text: '',
          })}
        />

        <CmLineCommentConstructorButtonBlockRedactor
          preKey={`l${linei}w${wordi}<`}
          postKey={`l${linei}w${wordi}>`}
          blockPropsHolder={propsDict}
          preLabel="Текст до"
          postLabel="Текст после"
          getDefaultPropsDict={place => ({
            place,
            kind: 0,
            linei,
            wordi,
            rate: cmComCommentTextDetectorCalculateRate(linei, wordi),
            text: '',
          })}
        />
      </div>

      {Array.from({ length: propsDict.wordChordiMaxDict[`l${linei}w${wordi}`] ?? 0 }, () => 0).map(
        (_, chordi, chorda) => {
          return (
            <CmLineCommentConstructorButtonChordConstructor
              key={chordi}
              chordi={chordi}
              linei={linei}
              wordi={wordi}
              isLast={chorda.length - 1 === chordi}
            />
          );
        },
      )}

      <Button
        icon="PlusSign"
        className="text-xOK"
        onClick={() => {
          cmLineCommentConstructorButtonRulePropsDictAtom.do.update(dict => {
            if (dict.dict == null) return;

            const chordi = (propsDict.wordChordiMaxDict[`l${linei}w${wordi}`] ?? -1) + 1;
            const keyPrefix = `l${linei}w${wordi}c${chordi}` as const;

            dict.dict[`${keyPrefix}^`] = {
              place: '^',
              chordi,
              kind: 0,
              linei,
              rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
              text: '',
              wordi,
            };

            dict.wordChordiMaxDict[`l${linei}w${wordi}`] ??= 0;
            dict.wordChordiMaxDict[`l${linei}w${wordi}`]!++;
          });
        }}
      >
        Создать правило для следующего аккорда
      </Button>
    </>
  );
};
