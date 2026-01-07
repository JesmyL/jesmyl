import { Button, DropdownMenu } from '#shared/components';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { metronomeIsSyncModeAtom } from '../state/atoms';

export const MetronomeToolsMenu = () => {
  const [isDropped, setDropped] = useState(false);
  const isSyncWithGroup = useAtomValue(metronomeIsSyncModeAtom);

  return (
    <DropdownMenu.Root
      onOpenChange={setDropped}
      open={isDropped}
    >
      <DropdownMenu.Trigger>
        <Button
          icon="Settings01"
          asSpan
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <IconCheckbox
            checked={isSyncWithGroup}
            onChange={metronomeIsSyncModeAtom.do.toggle}
            postfix="Синхронный режим"
          />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
