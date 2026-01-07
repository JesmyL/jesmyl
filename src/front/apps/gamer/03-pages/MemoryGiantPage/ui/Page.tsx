import { Button } from '#shared/components/ui/button';
import { convertFileToBase64 } from '#shared/lib/convertFileToBase64';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { renderComponentInNewWindow } from '#shared/lib/renders';
import { appFooterInitialHeight, appHeaderHeight } from '#shared/style/complect/variableStyles';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { FileInput } from '#shared/ui/FileInput';
import { useConfirm } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import { gamerIDB } from '$gamer/shared/state/gamerIDB';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import md5Func from 'md5';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import {
  gamerMemoryGiantBoardImageisAtom,
  gamerMemoryGiantCurrentKeyNumberAtom,
  gamerMemoryGiantShowAllImagesAtom,
  gamerMemoryGiantShowTimeSecondsAtom,
  gamerMemoryGiantUsedImagesAtom,
} from '../state/atoms';
import { GamerMemoryGiantBoard } from '../sub-ui/Board';
import { GamerMemoryGiantImageCard } from '../sub-ui/ImageCard';

let localWin: Window | null = null;

export const GamerMemoryGiantPage = () => {
  const [win, setWin] = useState(localWin);
  const allImages = useLiveQuery(() => gamerIDB.tb.memoryGiantImages.toArray());
  const usedImagesSet = new Set(useAtomValue(gamerMemoryGiantUsedImagesAtom));
  const boardImages = useAtomValue(gamerMemoryGiantBoardImageisAtom);
  const confirm = useConfirm();
  const showTimeSeconds = useAtomValue(gamerMemoryGiantShowTimeSecondsAtom);
  const currentKeyNumber = useAtomValue(gamerMemoryGiantCurrentKeyNumberAtom);

  useEffect(() => {
    if (win == null) return;
    localWin = win;

    gamerMemoryGiantBoardImageisAtom.do.fillBoard();

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win, 'unload' as never, () => {
          localWin = null;
          setWin(null);
        }),
        addEventListenerPipe(window, 'unload' as never, () => {
          const html = win.document.querySelector('html');
          if (html == null) return;
          html.style.background = 'black';
          html.innerHTML = '';
        }),
      )
      .effect();
  }, [win]);

  return (
    <PageContainerConfigurer
      className="GamerMemoryGiantPage"
      headTitle="Мемори-гигант"
      head={
        <div className="flex gap-3">
          {currentKeyNumber}

          <Dropdown
            id={showTimeSeconds}
            hiddenArrow
            items={[1, 3, 5, 8, 10].map(num => ({ id: num, title: num }))}
            onSelectId={gamerMemoryGiantShowTimeSecondsAtom.set}
            renderItem={({ id }) => <>{id} сек.</>}
          />

          <WithAtomValue atom={gamerMemoryGiantShowAllImagesAtom}>
            {isShow => (
              <Button
                icon={isShow ? 'ViewOff' : 'View'}
                onClick={gamerMemoryGiantShowAllImagesAtom.do.toggle}
              />
            )}
          </WithAtomValue>

          <Button
            variant="ok"
            icon={win ? 'Computer' : 'Play'}
            onClick={() => {
              if (win) {
                win.focus();
                return;
              }

              setWin(
                renderComponentInNewWindow({
                  reactNode: win => (
                    <StyledContainer>
                      <GamerMemoryGiantBoard win={win} />
                    </StyledContainer>
                  ),
                  target: 'gamer/memory-giant/board',
                }),
              );
            }}
          />

          <Button
            icon="Cancel01"
            disabled={!boardImages}
            variant="destructive"
            onClick={async () => {
              if (!(await confirm('Закончить игру?'))) return;

              gamerMemoryGiantBoardImageisAtom.do.abort();
              setWin(null);
            }}
          />
        </div>
      }
      content={
        boardImages ? (
          <GamerMemoryGiantBoard
            win={window}
            minusWinHeight={appFooterInitialHeight + appHeaderHeight}
          />
        ) : (
          <div className="flex flex-col gap-10">
            <FileInput
              accept=".png, .svg, .jpg, .jpeg"
              multiple
              onFilesSelect={async files => {
                files.forEach(async file => {
                  const src = await convertFileToBase64(file);
                  const md5 = md5Func(src);
                  await gamerIDB.tb.memoryGiantImages.put({ md5, src });
                  gamerMemoryGiantUsedImagesAtom.do.add(md5);
                });
              }}
            />

            <div className="w-full overflow-scroll">
              <div className="flex justify-around flex-wrap gap-3">
                {allImages?.map(image => {
                  return (
                    <div
                      key={image.md5}
                      className="relative"
                    >
                      <div className="absolute z-1 flex justify-between w-full top-0 px-3 pt-1">
                        <Button
                          size="icon"
                          onClick={() => gamerMemoryGiantUsedImagesAtom.do.toggle(image.md5)}
                        >
                          <IconCheckbox checked={usedImagesSet.has(image.md5)} />
                        </Button>
                        <TheIconButton
                          className="bg-xKO text-x3! rounded"
                          icon="Delete01"
                          confirm="Удалить изображение?"
                          onClick={async () => {
                            await gamerIDB.tb.memoryGiantImages.delete(image.md5);
                            gamerMemoryGiantUsedImagesAtom.do.removeFirst(image.md5);
                          }}
                        />
                      </div>
                      <div className={twMerge('transition-all', !usedImagesSet.has(image.md5) && 'grayscale scale-70')}>
                        <GamerMemoryGiantImageCard
                          image={image}
                          size={200}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )
      }
    />
  );
};

const StyledContainer = styled.div`
  background-color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
