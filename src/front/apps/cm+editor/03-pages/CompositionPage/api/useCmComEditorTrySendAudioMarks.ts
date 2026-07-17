import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/shared/state/com';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { extractNumber } from 'shared/utils';
import { forEachObjectEntries, objectLength } from 'shared/utils/object.utils';

export const useCmEditorCompositionTrySendAudioMarks = () => {
  const marksOnLoad = useAtomValue(cmComEditorAudioMarksEditPacksAtom);

  useEffect(() => {
    if (!objectLength(marksOnLoad)) return;

    const timeout = setTimeout(() => {
      forEachObjectEntries(marksOnLoad, (comw, marks) => {
        if (!marks) return;
        cmEditComExternalsClientTsjrpcMethods.updateAudioMarks_v2({ comw: extractNumber(comw), marks });
      });
    }, 200);

    return () => clearTimeout(timeout);
  }, [marksOnLoad]);
};
