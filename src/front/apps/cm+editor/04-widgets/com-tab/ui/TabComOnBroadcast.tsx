import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmComBroadcastPushKinds, useCmBroadcastCurrentScreenConfig } from '$cm/ext';

export const CmEditorComTabComOnBroadcast = ({ ccom }: { ccom: EditableCom }) => {
  const currentConfig = useCmBroadcastCurrentScreenConfig();
  const checkAccess = useCheckUserAccessRightsInScope();

  return (
    <>
      <div className="my-3">
        {checkAccess('cm', 'COM_TR', 'U') &&
          cmComBroadcastPushKinds.map(({ title }, kindi) => (
            <button
              key={kindi}
              className={'text-x1 px-2 mr-1 mt-1 ' + (ccom.broadcastPushKind === kindi ? 'bg-x7' : 'bg-x3')}
              onClick={() => {
                if (ccom.broadcastPushKind === kindi) return;
                cmEditComClientTsjrpcMethods.changePushKind({ comw: ccom.wid, value: kindi });
              }}
            >
              {title}
            </button>
          ))}
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
