import { cmComClientInvocatorMethods } from 'front/components/apps/cm/cm-invocator';
import { useExerExec } from '../../../../../../../complect/exer/hooks/useExer';
import { translationPushKinds } from '../../../../col/com/Com.complect';
import { useCmScreenTranslationCurrentConfig } from '../../../../translation/complect/controlled/hooks/configs';
import { useEditableCcom } from '../useEditableCcom';

export default function ComOnTranslations() {
  const ccom = useEditableCcom();
  const exec = useExerExec();
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
}
