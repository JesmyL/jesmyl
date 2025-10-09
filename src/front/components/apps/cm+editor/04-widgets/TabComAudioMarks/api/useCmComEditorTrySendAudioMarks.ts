import { mylib, MyLib } from '#shared/lib/my-lib';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/basis/lib/atoms/com';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';

export const useCmComEditorTrySendAudioMarks = () => {
  const marksOnLoad = useAtomValue(cmComEditorAudioMarksEditPacksAtom);

  useEffect(() => {
    if (!mylib.keys(marksOnLoad).length) return;

    const timeout = setTimeout(() => {
      MyLib.entries(marksOnLoad).forEach(([src, marks]) => {
        if (marks == null) return;
        cmEditComExternalsClientTsjrpcMethods.updateAudioMarks({ src, marks });
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [marksOnLoad]);
};
