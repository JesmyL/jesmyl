import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { cmComIsChordHardLevelAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { MenuComToolName } from 'shared/api';
import { Bool } from 'shared/enums';

export const CmEditorComTabChordHardLevelSelector = () => {
  const isHardChords = useAtomValue(cmComIsChordHardLevelAtom);

  return (
    <Dropdown
      id={isHardChords}
      items={[
        { id: Bool.False, title: translateBase(it => it.cm.com.tool[MenuComToolName.ChordHardLevel], { v: '0' }) },
        { id: Bool.True, title: translateBase(it => it.cm.com.tool[MenuComToolName.ChordHardLevel], { v: '1' }) },
      ]}
      onSelectId={cmComIsChordHardLevelAtom.set}
    />
  );
};
