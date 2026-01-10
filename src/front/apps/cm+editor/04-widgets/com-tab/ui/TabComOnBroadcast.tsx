import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { mylib } from '#shared/lib/my-lib';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmBroadcastScreenConfigurationPushKind, useCmBroadcastCurrentScreenConfig } from '$cm/ext';
import { cmComLineGroupingDefaultKinds } from 'shared/const/cm/comLineGroupingKind';

export const CmEditorComTabComOnBroadcast = ({ ccom }: { ccom: EditableCom }) => {
  const currentConfig = useCmBroadcastCurrentScreenConfig();
  const checkAccess = useCheckUserAccessRightsInScope();

  return (
    <>
      <div className="my-3">
        {checkAccess('cm', 'COM_TR', 'U') && (
          <>
            <CmBroadcastScreenConfigurationPushKind
              config={{
                pushKind: mylib.isNum(ccom.broadcastPushKind)
                  ? ccom.broadcastPushKind
                  : mylib.isStr(ccom.broadcastPushKind)
                    ? -100
                    : ccom.broadcastPushKind.n,
              }}
              updateConfig={({ pushKind }) => {
                if (pushKind == null || ccom.broadcastPushKind === pushKind) return;
                return cmEditComClientTsjrpcMethods.changePushKind({ comw: ccom.wid, value: pushKind });
              }}
            />

            <InputWithLoadingIcon
              icon="ListView"
              strongDefaultValue
              defaultValue={
                mylib.isStr(ccom.broadcastPushKind)
                  ? ccom.broadcastPushKind
                  : mylib.isNum(ccom.broadcastPushKind)
                    ? cmComLineGroupingDefaultKinds[ccom.broadcastPushKind]
                    : ccom.broadcastPushKind.n != null
                      ? cmComLineGroupingDefaultKinds[ccom.broadcastPushKind.n]
                      : ccom.broadcastPushKind.s
              }
              onChanged={value => cmEditComClientTsjrpcMethods.changePushKind({ comw: ccom.wid, value })}
            />
          </>
        )}
      </div>

      {ccom
        .groupSlideLinesByKind(ccom.takeSolidTextLines(true), currentConfig?.pushKind)
        .map(({ list, ord, rule, defaultRule }, linesi) => {
          return (
            <div
              key={linesi}
              className="border border-x2 my-2 pl-3"
            >
              {checkAccess('cm', 'COM_TR', 'U') && (
                <InputWithLoadingIcon
                  icon="TextNumberSign"
                  defaultValue={`${rule}`}
                  className="max-w-20"
                  strongDefaultValue
                  onChanged={value => {
                    return cmEditComClientTsjrpcMethods.changePushKind({
                      comw: ccom.wid,
                      value: { [ord.wid]: +value === defaultRule ? 0 : +value },
                    });
                  }}
                />
              )}
              {list?.map((text, texti) => (
                <div
                  key={texti}
                  className="my-5 pre-text"
                  dangerouslySetInnerHTML={{ __html: text.join('\n') }}
                />
              ))}
            </div>
          );
        })}
    </>
  );
};
