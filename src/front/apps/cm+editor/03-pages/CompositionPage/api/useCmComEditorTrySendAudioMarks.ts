import { mylib, MyLib } from '#shared/lib/my-lib';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/shared/state/com';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';

export const useCmEditorCompositionTrySendAudioMarks = () => {
  const marksOnLoad = useAtomValue(cmComEditorAudioMarksEditPacksAtom);

  useEffect(() => {
    if (!mylib.keys(marksOnLoad).length) return;

    const timeout = setTimeout(() => {
      MyLib.entries(marksOnLoad).forEach(([src, marks]) => {
        if (marks == null) return;
        cmEditComExternalsClientTsjrpcMethods.updateAudioMarks({ src, marks });
      });
    }, 200);

    return () => clearTimeout(timeout);
  }, [marksOnLoad]);
};
