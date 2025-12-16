import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { cmOpenComListModeAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';

export const CmComListPackKindSelector = () => {
  const mode = useAtomValue(cmOpenComListModeAtom);
  const classNameDict: PRecord<typeof mode, string> = { [mode]: 'text-x7' };

  return (
    <ButtonGroup.Root>
      <Button
        icon="LeftToRightListBullet"
        iconKind="TwotoneRounded"
        className={classNameDict.all}
        onClick={() => cmOpenComListModeAtom.set('all')}
      />

      <Button
        icon="Star"
        iconKind="DuotoneRounded"
        className={classNameDict.fav}
        onClick={() => cmOpenComListModeAtom.set('fav')}
      />

      <Button
        icon="CheckmarkBadge01"
        iconKind="DuotoneRounded"
        className={classNameDict.sel}
        onClick={() => cmOpenComListModeAtom.set('sel')}
      />
    </ButtonGroup.Root>
  );
};
