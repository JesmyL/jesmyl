import { cmEditComClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { translationPushKinds } from '$cm/col/com/translationPushKinds';
import { useCmScreenTranslationCurrentConfig } from '$cm/translation/complect/controlled/hooks/configs';
import { Button } from '@mui/material';

export const CmEditorTabComOnTranslations = () => {
  const ccom = useEditableCcom();
  const currentConfig = useCmScreenTranslationCurrentConfig();

  if (!ccom) return null;

  return (
    <>
      <div className="my-3">
        {translationPushKinds.map(({ title }, kindi) => (
          <Button
            key={kindi}
            color={ccom.translationPushKind === kindi ? 'x7' : 'x3'}
            onClick={() => {
              if (ccom.translationPushKind === kindi) return;
              cmEditComClientInvocatorMethods.changePushKind({ comw: ccom.wid, value: kindi });
            }}
          >
            {title}
          </Button>
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
