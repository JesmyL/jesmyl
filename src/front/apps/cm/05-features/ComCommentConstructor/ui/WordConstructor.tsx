import { Button } from '#shared/components';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { CmComOrderWid } from 'shared/api';
import { cmComCommentTextDetectorCalculateRate } from 'shared/utils/cm';
import { CmComCommentConstructorAccentKindRedactor } from './AccentKindRedactor';
import { CmComCommentConstructorBlockRedactor } from './BlockRedactor';
import { CmComCommentConstructorChordConstructor } from './ChordConstructor';

export const CmComCommentConstructorWordConstructor = ({
  ordw,
  linei,
  wordi,
}: {
  ordw: CmComOrderWid;
  linei: number;
  wordi: number;
}) => {
  const propsDict = useAtomValue(cmComCommentConstructorRulePropsDictAtom);

  return (
    <>
      <div className="rounded bg-x2 my-10 p-3">
        <div>Слово {wordi + 1}</div>

        <CmComCommentConstructorAccentKindRedactor
          blockPropsHolder={propsDict}
          blockKey={`s${ordw}l${linei}w${wordi}^`}
          getDefaultPropsDict={() => ({
            sel: ordw,
            place: '^',
            kind: 0,
            linei,
            wordi,
            rate: cmComCommentTextDetectorCalculateRate(linei, wordi),
            text: '',
          })}
        />

        <CmComCommentConstructorBlockRedactor
          preKey={`s${ordw}l${linei}w${wordi}<`}
          postKey={`s${ordw}l${linei}w${wordi}>`}
          blockPropsHolder={propsDict}
          preLabel="Текст до"
          postLabel="Текст после"
          getDefaultPropsDict={place => ({
            sel: ordw,
            place,
            kind: 0,
            linei,
            wordi,
            rate: cmComCommentTextDetectorCalculateRate(linei, wordi),
            text: '',
          })}
        />
      </div>

      {Array.from({ length: propsDict.wordChordiMaxDict[`s${ordw}l${linei}w${wordi}`] ?? 0 }, () => 0).map(
        (_, chordi, chorda) => {
          return (
            <CmComCommentConstructorChordConstructor
              key={chordi}
              ordw={ordw}
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

            const chordi = (propsDict.wordChordiMaxDict[`s${ordw}l${linei}w${wordi}`] ?? -1) + 1;
            const keyPrefix = `s${ordw}l${linei}w${wordi}c${chordi}` as const;

            dict.dict[`${keyPrefix}^`] = {
              sel: ordw,
              place: '^',
              chordi,
              kind: 0,
              linei,
              rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
              text: '',
              wordi,
            };

            dict.wordChordiMaxDict[`s${ordw}l${linei}w${wordi}`] ??= 0;
            dict.wordChordiMaxDict[`s${ordw}l${linei}w${wordi}`]!++;
          });
        }}
      >
        Создать правило для следующего аккорда
      </Button>
    </>
  );
};
