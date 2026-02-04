import { cmComChordHardLevelAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { CmComTool } from '../ComTool';

export const CmComToolChordHardLevel = () => {
  const hardLevel = useAtomValue(cmComChordHardLevelAtom);

  const changesDict = {
    1: {
      next: 2,
      icon: 'BatteryLow',
    },
    2: {
      next: 3,
      icon: 'BatteryMedium01',
    },
    3: {
      next: 1,
      icon: 'BatteryFull',
    },
  } as const;

  return (
    <CmComTool
      title={`Уровень сложности аккорда - ${hardLevel}`}
      icon={changesDict[hardLevel].icon}
      onClick={() => cmComChordHardLevelAtom.set(changesDict[hardLevel].next)}
    />
  );
};
