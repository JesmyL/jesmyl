import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmOpenComListModeAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { objectKeys } from 'shared/utils/object.utils';

const MODE_DICT = {
  all: ['LeftToRightListBullet', 'TwotoneRounded', BaseLocaleKey.CmListsAll],
  fav: ['Favourite', 'DuotoneRounded', BaseLocaleKey.Favorite],
  sel: ['CheckmarkBadge01', 'DuotoneRounded', BaseLocaleKey.Selected],
  cached: ['CloudDownload', 'TwotoneRounded', BaseLocaleKey.Cached],
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
          {translateBase(MODE_DICT[id][2])}
        </>
      )}
      hiddenArrow
    />
  );
};
