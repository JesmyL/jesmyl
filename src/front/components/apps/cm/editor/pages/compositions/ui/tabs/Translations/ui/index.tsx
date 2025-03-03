import { translationPushKinds } from '@cm/col/com/Com.complect';
import { cmComClientInvocatorMethods } from '@cm/editor/lib/cm-editor-invocator.methods';
import { useCmScreenTranslationCurrentConfig } from '@cm/translation/complect/controlled/hooks/configs';
import { useEditableCcom } from '../../../../lib/useEditableCom';

export const CmComOnTranslationsRedactorTab = () => {
  const ccom = useEditableCcom();
  const currentConfig = useCmScreenTranslationCurrentConfig();

  if (!ccom) return null;

  return (
    <>
      <div>
        {translationPushKinds.map(({ title }, kindi) => (
          <button
            key={kindi}
            disabled={ccom.translationPushKind === kindi}
            onClick={() => {
              cmComClientInvocatorMethods.changePushKind(null, ccom.wid, kindi);
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
            style={{
              whiteSpace: 'pre-wrap',
            }}
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
