import { Button } from '#shared/components';
import { cmComCommentTextDetectorCalculateRate } from '$cm/entities/com-comment';
import { useAtomValue } from 'atomaric';
import { cmLineCommentConstructorButtonRulePropsDictAtom } from '../state/atoms';
import { CmLineCommentConstructorButtonAccentKindRedactor } from './AccentKindRedactor';
import { CmLineCommentConstructorButtonTextRedactor } from './TextRedactor';

export const CmLineCommentConstructorButtonChordConstructor = ({
  linei,
  wordi,
  chordi,
  isLast,
}: {
  linei: number;
  wordi: number;
  chordi: number;
  isLast: boolean;
}) => {
  const propsDict = useAtomValue(cmLineCommentConstructorButtonRulePropsDictAtom);

  return (
    <>
      <div
        key={chordi}
        className="rounded bg-x2 my-10 p-3"
      >
        <div className="flex w-full justify-between">
          <span>Аккорд {chordi + 1}</span>
          {isLast && (
            <Button
              icon="Delete02"
              className="text-xKO"
              onClick={() => {
                cmLineCommentConstructorButtonRulePropsDictAtom.do.update(dict => {
                  if (dict.dict == null) return;

                  const keyPrefix = `${linei}:${wordi}/${chordi}` as const;

                  delete dict.dict[`${keyPrefix}^`];
                  delete dict.dict[`${keyPrefix}<`];
                  delete dict.dict[`${keyPrefix}>`];

                  dict.wordChordiMaxDict[`${linei}:${wordi}`] ??= 1;
                  dict.wordChordiMaxDict[`${linei}:${wordi}`]!--;
                });
              }}
            />
          )}
        </div>

        <CmLineCommentConstructorButtonAccentKindRedactor
          blockKey={`${linei}:${wordi}/${chordi}^`}
          blockPropsHolder={propsDict}
          getDefaultPropsDict={() => ({
            linei,
            wordi,
            chordi,
            text: '',
            place: '^',
            kind: 0,
            rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
          })}
        />

        <div className="flex gap-2">
          <CmLineCommentConstructorButtonTextRedactor
            blockKey={`${linei}:${wordi}/${chordi}<`}
            blockPropsHolder={propsDict}
            label="До"
            getDefaultPropsDict={() => ({
              linei,
              wordi,
              chordi,
              text: '',
              place: '<',
              kind: 0,
              rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
            })}
          />

          <CmLineCommentConstructorButtonTextRedactor
            blockKey={`${linei}:${wordi}/${chordi}^`}
            blockPropsHolder={propsDict}
            label="Вместо"
            getDefaultPropsDict={() => ({
              linei,
              wordi,
              chordi,
              text: '',
              place: '^',
              kind: 0,
              rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
            })}
          />

          <CmLineCommentConstructorButtonTextRedactor
            blockKey={`${linei}:${wordi}/${chordi}>`}
            blockPropsHolder={propsDict}
            label="После"
            getDefaultPropsDict={() => ({
              linei,
              wordi,
              chordi,
              text: '',
              place: '>',
              kind: 0,
              rate: cmComCommentTextDetectorCalculateRate(linei, wordi, chordi),
            })}
          />
        </div>
      </div>
    </>
  );
};
