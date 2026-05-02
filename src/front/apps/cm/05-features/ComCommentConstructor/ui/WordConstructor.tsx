import { Button } from '#shared/components';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { CmComOrderWid } from 'shared/api';
import { CmComCommentConstructorRuleKind } from 'shared/model/cm/com-comment';
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
  const wordKeyPrefix = `s${ordw}l${linei}w${wordi}` as const;

  return (
    <>
      <div className="rounded bg-x2 my-10 p-3">
        <div>Слово {wordi + 1}</div>

        <CmComCommentConstructorAccentKindRedactor
          blockPropsHolder={propsDict}
          blockKey={`${wordKeyPrefix}^`}
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
          preKey={`${wordKeyPrefix}<`}
          postKey={`${wordKeyPrefix}>`}
          kind={CmComCommentConstructorRuleKind.Word}
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

      {Array.from({ length: propsDict.wordChordiMaxDict[wordKeyPrefix] ?? 0 }, () => 0).map((_, chordi, chorda) => {
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
      })}

      <Button
        icon="PlusSign"
        className="text-xOK"
        onClick={() => {
          cmComCommentConstructorRulePropsDictAtom.do.update(dict => {
            if (dict.dict == null) return;

            const chordi = (propsDict.wordChordiMaxDict[wordKeyPrefix] ?? -1) + 1;
            const chordKeyPrefix = `${wordKeyPrefix}c${chordi}` as const;

            dict.dict[`${chordKeyPrefix}^`] = {
              sel: ordw,
              place: '^',
              chordi,
              kind: 0,
              linei,
              rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
              text: '',
              wordi,
            };

            dict.wordChordiMaxDict[wordKeyPrefix] ??= 0;
            dict.wordChordiMaxDict[wordKeyPrefix]!++;
          });
        }}
      >
        Создать правило для следующего аккорда
      </Button>
    </>
  );
};
