import { translateBase } from '#basis/locale';
import { cmComIsAudioPlayerHiddenAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { MenuComToolName } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { CmComTool } from '../ComTool';

export const CmComToolOpenPlayer = () => {
  const isHidden = useAtomValue(cmComIsAudioPlayerHiddenAtom);

  return (
    <CmComTool
      title={translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.OpenPlayer])}
      icon="PlayCircle"
      iconKind={isHidden ? undefined : 'SolidRounded'}
      onClick={cmComIsAudioPlayerHiddenAtom.do.toggle}
    />
  );
};
