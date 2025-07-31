import { cmEditComClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { translationPushKinds } from '$cm/col/com/translationPushKinds';
import { useCmScreenTranslationCurrentConfig } from '$cm/translation/complect/controlled/hooks/configs';

export const CmEditorTabComOnTranslations = () => {
  const ccom = useEditableCcom();
  const currentConfig = useCmScreenTranslationCurrentConfig();

  if (!ccom) return null;

  return (
    <>
      <div className="my-3">
        {translationPushKinds.map(({ title }, kindi) => (
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
            className="margin-big-gap-v"
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
