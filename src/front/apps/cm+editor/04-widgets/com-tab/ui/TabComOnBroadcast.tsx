import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Button, ButtonGroup } from '#shared/components';
import { mylib } from '#shared/lib/my-lib';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmBroadcastScreenConfigurationPushKind } from '$cm/ext';
import { useState } from 'react';
import { cmComLineGroupingDefaultKinds } from 'shared/const/cm/comLineGroupingKind';
import { CmBroadcastMonolineSlide, CmBroadcastSlideGrouperOrdCombiner } from 'shared/model/cm/broadcast';
import { itNIt } from 'shared/utils';

export const CmEditorComTabComOnBroadcast = ({ ccom }: { ccom: EditableCom }) => {
  const checkAccess = useCheckUserAccessRightsInScope();
  const [isK2, setIsK2] = useState(false);
  const comPushKind = ccom.broadcastPushKind(isK2 ? 'k2' : 'k', 0);

  const textsWithNumeredLines = ccom.makeExpandedSolidSlides().map((slides): CmBroadcastMonolineSlide[] =>
    slides.map((slide, slidei) => ({
      ...slide,
      lines: slide.lines.map(line => `${slidei + 1}: ${line}`),
    })),
  );

  return (
    <>
      <div className="my-3">
        {checkAccess('cm', 'COM_TR', 'U') && (
          <>
            <ButtonGroup.Root
              className="my-5"
              onClick={() => setIsK2(itNIt)}
            >
              <Button className={isK2 ? '' : 'text-x7'}>Обычная версия</Button>
              <Button className={isK2 ? 'text-x7' : ''}>Минимальная версия</Button>
            </ButtonGroup.Root>
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
              defaultValue={
                mylib.isStr(comPushKind)
                  ? comPushKind
                  : mylib.isNum(comPushKind)
                    ? cmComLineGroupingDefaultKinds[comPushKind]
                    : comPushKind.s != null
                      ? comPushKind.s
                      : cmComLineGroupingDefaultKinds[comPushKind.n ?? 0]
              }
              onChanged={value => cmEditComClientTsjrpcMethods.changePushKind({ comw: ccom.wid, value, isK2 })}
            />
          </>
        )}
      </div>

      {ccom
        .groupSlideLinesByKind(textsWithNumeredLines, comPushKind)
        .map(({ slides, ord, rule, defaultRule, repeat }, linesi) => {
          const key: keyof CmBroadcastSlideGrouperOrdCombiner = `${ord.wid}${repeat}`;

          return (
            <div
              key={linesi}
              className="border border-x2 my-2 pl-3"
            >
              {checkAccess('cm', 'COM_TR', 'U') && (
                <InputWithLoadingIcon
                  icon="ListView"
                  defaultValue={`${rule}`}
                  className="max-w-20"
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
              {slides?.map((text, texti) => (
                <div
                  key={texti}
                  className="my-5 pre-text"
                  dangerouslySetInnerHTML={{ __html: text.map(slide => slide.lines).join('\n') }}
                />
              ))}
            </div>
          );
        })}
    </>
  );
};
