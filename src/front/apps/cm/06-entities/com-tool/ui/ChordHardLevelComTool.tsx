import { translateBase } from '#basis/locale';
import { cmComIsChordHardLevelAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { MenuComToolName } from 'shared/api';
import { Bool } from 'shared/enums';
import { CmComTool } from '../ComTool';

export const CmComToolChordHardLevel = () => {
  const isHardChords = useAtomValue(cmComIsChordHardLevelAtom);

  const changesDict = {
    [Bool.False]: {
      next: Bool.True,
      icon: 'BatteryLow',
    },
    [Bool.True]: {
      next: Bool.False,
      icon: 'BatteryFull',
    },
  } as const;

  return (
    <CmComTool
      title={translateBase(it => it.cm.com.tool[MenuComToolName.ChordHardLevel], { v: `${isHardChords}` })}
      icon={changesDict[isHardChords].icon}
      onClick={() => cmComIsChordHardLevelAtom.set(changesDict[isHardChords].next)}
    />
  );
};
