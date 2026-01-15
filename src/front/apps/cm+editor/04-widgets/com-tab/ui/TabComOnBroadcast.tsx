import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { mylib } from '#shared/lib/my-lib';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmBroadcastScreenConfigurationPushKind } from '$cm/ext';
import { cmComLineGroupingDefaultKinds } from 'shared/const/cm/comLineGroupingKind';

export const CmEditorComTabComOnBroadcast = ({ ccom }: { ccom: EditableCom }) => {
  const checkAccess = useCheckUserAccessRightsInScope();

  const textsWithNumeredLines = ccom.takeSolidTextLines().map(slideProps => ({
    ...slideProps,
    ord: slideProps.ord,
    list: slideProps.lines.map((line, linei) => `${linei + 1}: ${line}`),
  }));

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
                    : ccom.broadcastPushKind.n || 0,
              }}
              updateConfig={({ pushKind }) => {
                if (pushKind == null || (ccom.broadcastPushKind || 0) === pushKind) return;
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
                    : ccom.broadcastPushKind.s != null
                      ? ccom.broadcastPushKind.s
                      : cmComLineGroupingDefaultKinds[ccom.broadcastPushKind.n ?? 0]
              }
              onChanged={value => cmEditComClientTsjrpcMethods.changePushKind({ comw: ccom.wid, value })}
            />
          </>
        )}
      </div>

      {ccom.groupTextLinesByKind(textsWithNumeredLines).map(({ lines, ord, rule, defaultRule }, linesi) => {
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
                    value: { [ord.wid]: +value === defaultRule ? 0 : +value },
                  });
                }}
              />
            )}
            {lines?.map((text, texti) => (
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
