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
              config={{ pushKind: mylib.isStr(ccom.broadcastPushKind) ? -100 : ccom.broadcastPushKind }}
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
                  : cmComLineGroupingDefaultKinds[ccom.broadcastPushKind]
              }
              onChanged={value => cmEditComClientTsjrpcMethods.changePushKind({ comw: ccom.wid, value })}
            />
          </>
        )}
      </div>

      {ccom.getOrderedBlocks(currentConfig?.pushKind).map((lines, linesi) => {
        return (
          <div
            key={linesi}
            className="my-5"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {lines?.map((text, texti) => (
              <div
                key={texti}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ))}
          </div>
        );
      })}
    </>
  );
};
