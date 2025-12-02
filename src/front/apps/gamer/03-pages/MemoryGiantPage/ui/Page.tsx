import { Button } from '#shared/components/ui/button';
import { convertFileToBase64 } from '#shared/lib/convertFileToBase64';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { renderComponentInNewWindow } from '#shared/lib/renders';
import { FileInput } from '#shared/ui/FileInput';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { gamerIDB } from '$gamer/shared/state/gamerIDB';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import md5Func from 'md5';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { gamerMemoryGiantBoardImageisAtom, gamerMemoryGiantUsedImagesAtom } from '../state/atoms';
import { GamerMemoryGiantBoard } from '../sub-ui/Board';
import { GamerMemoryGiantImageCard } from '../sub-ui/ImageCard';

let localWin: Window | null = null;

export const GamerMemoryGiantPage = () => {
  const [win, setWin] = useState(localWin);
  const [widthHeight, setWidthHeight] = useState<{ w: number; h: number }>();
  const allImages = useLiveQuery(() => gamerIDB.tb.memoryGiantImages.toArray());
  const usedImagesSet = new Set(useAtomValue(gamerMemoryGiantUsedImagesAtom));
  const boardImages = useAtomValue(gamerMemoryGiantBoardImageisAtom);

  useEffect(() => {
    if (win == null) return;
    localWin = win;

    gamerMemoryGiantBoardImageisAtom.do.fillBoard();

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(win, 'resize', () => {
          setWidthHeight({ w: win.innerWidth, h: win.innerHeight });
        }),
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
        boardImages && win ? (
          <Button
            variant={'destructive'}
            onClick={() => {
              gamerMemoryGiantBoardImageisAtom.do.abort();
              setWin(null);
            }}
          >
            Закончить игру
          </Button>
        ) : (
          <Button
            className="w-full"
            variant="ok"
            onClick={() => {
              if (win) {
                win.focus();
                return;
              }

              setWin(
                renderComponentInNewWindow(
                  () => (
                    <StyledContainer>
                      <GamerMemoryGiantBoard />
                    </StyledContainer>
                  ),
                  undefined,
                  'gamer/memory-giant/board',
                ),
              );
            }}
          >
            {boardImages ? 'Продолжить' : 'Начать'} игру
          </Button>
        )
      }
      content={
        boardImages ? (
          // <div className="max-w-[100vmin] max-h-[100vmin] aspect-[1/1]">
          <GamerMemoryGiantBoard widthHeight={widthHeight} />
        ) : (
          // </div>
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
                            gamerMemoryGiantUsedImagesAtom.do.remove(image.md5);
                          }}
                        />
                      </div>
                      <div className={twMerge('transition-all', !usedImagesSet.has(image.md5) && 'grayscale scale-70')}>
                        <GamerMemoryGiantImageCard image={image} />
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
