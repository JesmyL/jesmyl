import { useAtomValue } from 'atomaric';
import { CmAudioTail, CmComAudioMarkPackTime, CmComWid } from 'shared/api';
import { checkIsNotNil } from 'shared/utils/checkIs';
import { cmComAudioMarksDirectChangeTimesAtom, cmComEditorAudioMarksEditPacksAtom } from '../state/com';

export const useCmComAudioMarkChanging = (comw: CmComWid, src: CmAudioTail | nil) => {
  const editPacks = useAtomValue(cmComEditorAudioMarksEditPacksAtom);
  const directChangeTimes = useAtomValue(cmComAudioMarksDirectChangeTimesAtom);

  return (time: CmComAudioMarkPackTime) =>
    directChangeTimes.has(time) || (checkIsNotNil(src) && Object.hasOwn(editPacks[comw]?.[src] ?? {}, time));
};
