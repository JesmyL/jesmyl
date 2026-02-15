import { Button } from '#shared/components';
import { cmComCommentTextDetectorCalculateRate } from '$cm/entities/com-comment';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { CmComCommentConstructorAccentKindRedactor } from './AccentKindRedactor';
import { CmComCommentConstructorBlockRedactor } from './BlockRedactor';
import { CmComCommentConstructorChordConstructor } from './ChordConstructor';

export const CmComCommentConstructorWordConstructor = ({ linei, wordi }: { linei: number; wordi: number }) => {
  const propsDict = useAtomValue(cmComCommentConstructorRulePropsDictAtom);

  return (
    <>
      <div className="rounded bg-x2 my-10 p-3">
        <div>Слово {wordi + 1}</div>

        <CmComCommentConstructorAccentKindRedactor
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

        <CmComCommentConstructorBlockRedactor
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
            <CmComCommentConstructorChordConstructor
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
          cmComCommentConstructorRulePropsDictAtom.do.update(dict => {
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
