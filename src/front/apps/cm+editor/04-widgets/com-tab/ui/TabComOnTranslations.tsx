import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmComTranslationPushKinds, useCmTranslationCurrentScreenConfig } from '$cm/ext';
import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';

export const CmEditorComTabComOnTranslations = ({ ccom }: { ccom: EditableCom }) => {
  const currentConfig = useCmTranslationCurrentScreenConfig();
  const checkAccess = useCheckUserAccessRightsInScope();

  return (
    <>
      <div className="my-3">
        {checkAccess('cm', 'COM_TR', 'U') &&
          cmComTranslationPushKinds.map(({ title }, kindi) => (
            <button
              key={kindi}
              className={'text-x1 px-2 mr-1 mt-1 ' + (ccom.translationPushKind === kindi ? 'bg-x7' : 'bg-x3')}
              onClick={() => {
                if (ccom.translationPushKind === kindi) return;
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
