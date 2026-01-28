import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Button, ButtonGroup } from '#shared/components';
import { mylib } from '#shared/lib/my-lib';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmBroadcastScreenConfigurationPushKind, CmCom } from '$cm/ext';
import { useState } from 'react';
import { makeRegExp } from 'regexpert';
import { cmComLineGroupingDefaultKinds } from 'shared/const/cm/comLineGroupingKind';
import { CmBroadcastMonolineSlide, CmBroadcastSlideGrouperOrdCombiner } from 'shared/model/cm/broadcast';
import { itNIt } from 'shared/utils';
import { twMerge } from 'tailwind-merge';

export const CmEditorComTabComOnBroadcast = ({ ccom }: { ccom: EditableCom }) => {
  const checkAccess = useCheckUserAccessRightsInScope();
  const [isK2, setIsK2] = useState(true);
  const comPushKind = ccom.broadcastPushKind(isK2 ? 'k2' : 'k', 0);
  const minOverLimit = isK2 ? 3 : 6;

  const textsWithNumeredLines = ccom.makeExpandedSolidSlides().map((slides): CmBroadcastMonolineSlide[] =>
    slides.map((slide, slidei) => ({
      ...slide,
      lines: CmCom.makeLinesWithoutNlMarker(slide.lines).map(line => `${slidei + 1}: ${line}`),
    })),
  );

  const overLimitLinesCountSet = new Set(
    Array(minOverLimit)
      .fill(0)
      .map((_, i) => `${i + minOverLimit}`),
  );

  const defaultRulesStr = mylib.isStr(comPushKind)
    ? comPushKind
    : mylib.isNum(comPushKind)
      ? cmComLineGroupingDefaultKinds[comPushKind]
      : comPushKind.s != null
        ? comPushKind.s
        : cmComLineGroupingDefaultKinds[comPushKind.n ?? 0];

  const overLimitsInDefaultRulesStr = defaultRulesStr
    .replace(makeRegExp('/=?\\d+:/g'), ' ')
    .split('')
    .find(num => overLimitLinesCountSet.has(num));

  return (
    <>
      <div className="my-3">
        {checkAccess('cm', 'COM_TR', 'U') && (
          <>
            <div className="my-5 flex gap-3">
              Версия
              <ButtonGroup.Root onClick={() => setIsK2(itNIt)}>
                <Button className={isK2 ? 'text-x7' : ''}>Минимальная</Button>
                <Button className={isK2 ? '' : 'text-x7'}>Обычная</Button>
              </ButtonGroup.Root>
            </div>
            <CmBroadcastScreenConfigurationPushKind
              config={{
                pushKind: mylib.isNum(comPushKind) ? comPushKind : mylib.isStr(comPushKind) ? -100 : comPushKind.n || 0,
              }}
              updateConfig={({ pushKind }) => {
                if (pushKind == null || (comPushKind || 0) === pushKind) return;
                return cmEditComClientTsjrpcMethods.changePushKind({ comw: ccom.wid, value: pushKind, isK2 });
              }}
            />

            <InputWithLoadingIcon
              icon="ListView"
              strongDefaultValue
              defaultValue={defaultRulesStr}
              onChanged={value => cmEditComClientTsjrpcMethods.changePushKind({ comw: ccom.wid, value, isK2 })}
            />
            {overLimitsInDefaultRulesStr && (
              <div className="text-xKO">{overLimitsInDefaultRulesStr} - слишком большая цифра разбивки</div>
            )}
          </>
        )}
      </div>

      {ccom
        .groupSlideLinesByKind(textsWithNumeredLines, comPushKind, true)
        .map(({ slides, ord, rule, defaultRule, repeat, ownRule, takeSameGroupKeys, linesLen }, linesi) => {
          const key: keyof CmBroadcastSlideGrouperOrdCombiner = `${ord.wid}${repeat}`;
          const sameGroupKeys = takeSameGroupKeys?.();

          return (
            <div
              key={linesi}
              className="border border-x2 my-2 pl-3"
            >
              {checkAccess('cm', 'COM_TR', 'U') && (
                <>
                  {(ord.isRealText() || ownRule != null) && (
                    <InputWithLoadingIcon
                      icon="ListView"
                      defaultValue={`${rule}`}
                      className={twMerge(
                        'max-w-40',
                        ownRule === defaultRule ? 'border-xKO' : ownRule != null && 'border-x7',
                        (sameGroupKeys || !ord.isRealText()) && 'bg-xKO! text-x1!',
                      )}
                      strongDefaultValue
                      type="tel"
                      onChanged={value => {
                        return cmEditComClientTsjrpcMethods.changePushKind({
                          comw: ccom.wid,
                          value: { [key]: +value === defaultRule ? 0 : +value },
                          isK2,
                        });
                      }}
                    />
                  )}

                  {slides.some(slide => slide.length >= minOverLimit) && (
                    <div className="text-xKO">Слишком много строк</div>
                  )}

                  {sameGroupKeys && (
                    <Button
                      icon="Link01"
                      className="text-xKO flex gap-3"
                      onClick={() => {
                        return cmEditComClientTsjrpcMethods.changePushKind({
                          comw: ccom.wid,
                          value: {},
                          setGroupValue: { linesLen, rule, keys: sameGroupKeys },
                          isK2,
                        });
                      }}
                    >
                      Создать единое ={linesLen} правило
                    </Button>
                  )}
                </>
              )}
              {slides?.map((monolineSlides, texti) => (
                <div
                  key={texti}
                  className={twMerge('my-5 pre-text', monolineSlides.length >= minOverLimit && 'text-xKO')}
                  dangerouslySetInnerHTML={{ __html: monolineSlides.map(slide => slide.lines).join('\n') }}
                />
              ))}
            </div>
          );
        })}
    </>
  );
};
