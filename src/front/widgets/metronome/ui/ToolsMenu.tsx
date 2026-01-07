import { Button, DropdownMenu } from '#shared/components';
import { mylib } from '#shared/lib/my-lib';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import {
  metronomeIsSyncWithGroupAtom,
  metronomeJoinedToLeaderAtom,
  metronomeLeaderTimeStampDictAtom,
} from '../state/atoms';
import { MetronomeQrShow } from './QrShow';
import { MetronomeReaderQr } from './ReaderQr';

export const MetronomeToolsMenu = () => {
  const [isDropped, setDropped] = useState(false);
  const joinedToLeaderName = useAtomValue(metronomeJoinedToLeaderAtom);
  const leaders = useAtomValue(metronomeLeaderTimeStampDictAtom);
  const isSyncWithGroup = useAtomValue(metronomeIsSyncWithGroupAtom);

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
            onChange={metronomeIsSyncWithGroupAtom.do.toggle}
            postfix="Синхронизироваться группой"
          />
        </DropdownMenu.Item>

        {isSyncWithGroup && (
          <>
            <DropdownMenu.Item>
              <MetronomeReaderQr />
            </DropdownMenu.Item>

            <DropdownMenu.Item>
              <MetronomeQrShow />
            </DropdownMenu.Item>

            {mylib.keys(leaders).map(leaderName => {
              return (
                <DropdownMenu.Item key={leaderName}>
                  <IconCheckbox
                    checked={joinedToLeaderName === leaderName}
                    onChange={() =>
                      metronomeJoinedToLeaderAtom.set(
                        metronomeJoinedToLeaderAtom.get() === leaderName ? '' : leaderName,
                      )
                    }
                    postfix={
                      <>
                        {leaderName}
                        <TheIconButton
                          confirm="Удалить ориентировку на лидера?"
                          className="text-xKO!"
                          icon="Delete02"
                          onClick={() => metronomeLeaderTimeStampDictAtom.do.setPartial({ [leaderName]: undefined })}
                        />
                      </>
                    }
                  />
                </DropdownMenu.Item>
              );
            })}
          </>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
