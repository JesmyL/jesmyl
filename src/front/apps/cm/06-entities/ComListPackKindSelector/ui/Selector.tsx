import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmOpenComListModeAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { objectKeys } from 'shared/utils/object.utils';
import { cmComListPackKindSelectorLocaleKeyDict } from '../model';

const MODE_DICT = {
  all: ['LeftToRightListBullet', 'TwotoneRounded'],
  fav: ['Favourite', 'DuotoneRounded'],
  sel: ['CheckmarkBadge01', 'DuotoneRounded'],
  cached: ['CloudDownload', 'TwotoneRounded'],
} as const;

export const CmComListPackKindSelector = () => {
  const mode = useAtomValue(cmOpenComListModeAtom);

  return (
    <Dropdown
      id={mode}
      onSelectId={mode => cmOpenComListModeAtom.set(mode)}
      items={objectKeys(MODE_DICT).map(id => {
        const [icon, kind] = MODE_DICT[id];

        return { id, title: <LazyIcon icon={icon} kind={kind} /> };
      })}
      renderItem={({ node, id }) => (
        <>
          {node}
          {translateBase(cmComListPackKindSelectorLocaleKeyDict[id])}
        </>
      )}
      hiddenArrow
    />
  );
};
