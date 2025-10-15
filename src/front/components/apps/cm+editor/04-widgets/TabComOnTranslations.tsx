import { cmEditComClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';
import { useCmTranslationCurrentScreenConfig } from 'front/apps/cm/04-widgets/translation/hooks/configs';
import { cmComTranslationPushKinds } from 'front/apps/cm/06-entities/com/const/translationPushKinds';

export const CmEditorTabComOnTranslations = ({ ccom }: { ccom: EditableCom }) => {
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
