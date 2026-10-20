import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { cmComIsChordHardLevelAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { MenuComToolName } from 'shared/api';
import { Bool } from 'shared/enums';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const CmEditorComTabChordHardLevelSelector = () => {
  const isHardChords = useAtomValue(cmComIsChordHardLevelAtom);

  return (
    <Dropdown
      id={isHardChords}
      items={[
        {
          id: Bool.False,
          title: translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.ChordHardLevel], { v: '0' }),
        },
        {
          id: Bool.True,
          title: translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.ChordHardLevel], { v: '1' }),
        },
      ]}
      onSelectId={cmComIsChordHardLevelAtom.set}
    />
  );
};
