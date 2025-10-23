import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { getParentNodeWithClassName } from '#shared/lib/getParentNodeWithClassName';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { cmIDB, useCmComList } from '$cm/ext';
import { useNavigate } from '@tanstack/react-router';
import { atom, useAtomValue } from 'atomaric';
import { useEffect, useMemo, useRef } from 'react';
import { makeRegExp } from 'regexpert';
import styled, { css } from 'styled-components';

const isOpenAtom = atom(false);
const lastClickedChordAtom = atom('', 'cm+editor:lastClickedChord');

export const CmEditorChordSearchUnknownChordsModalTrigger = () => {
  const coms = useCmComList();
  const chordPack = cmIDB.useValue.chordPack();
  const aRef = useRef<HTMLAnchorElement>(null);
  const lastClickedChord = useAtomValue(lastClickedChordAtom);
  const isOpen = useAtomValue(isOpenAtom);
  const navigate = useNavigate();

  const unknownChords = useMemo(() => {
    const unknownChordsSet = new Set<string>([lastClickedChordAtom.get()]);

    coms.forEach(com => {
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(delta =>
        com.transposedBlocks(delta)?.forEach(block => {
          block.split(makeRegExp('/[-\\s.|]+/')).forEach(chord => {
            if (chord && chordPack[chord] === undefined) unknownChordsSet.add(chord);
          });
        }),
      );
    });

    unknownChordsSet.delete('');

    return Array.from(unknownChordsSet)
      .sort()
      .map(chord => {
        return (
          <div
            key={chord}
            className="search-chord flex gap-5 my-3 pointer p-2 justify-center"
            data-search-chord={chord}
          >
            {chord}
            <div className="search-chord-edit-button ring-2 rounded-sm px-3">EDIT</div>
          </div>
        );
      });
  }, [chordPack, coms]);

  useEffect(() => {
    if (!isOpen) return;

    const timeout = setTimeout(
      () =>
        document
          .querySelector(`[data-search-chord="${lastClickedChord}"]`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      100,
    );

    return () => clearTimeout(timeout);
  }, [isOpen, lastClickedChord]);

  return (
    <>
      <a
        ref={aRef}
        hidden
        target="_blank"
      />
      <Button
        icon="SearchVisual"
        onClick={isOpenAtom.do.toggle}
      />

      <Modal openAtom={isOpenAtom}>
        <ModalHeader>Неизвестные аккорды ({unknownChords.length})</ModalHeader>

        <StyledModalBody
          $lastClickedChord={lastClickedChord}
          $isLastChordExists={chordPack[lastClickedChord] !== undefined}
        >
          <ButtonGroup.Root className="sticky">
            {simpleChords.map(chord => {
              return (
                <Button
                  key={chord}
                  onClick={() =>
                    document
                      .querySelector(`[data-search-chord^="${chord}"]`)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }
                >
                  {chord}
                </Button>
              );
            })}
          </ButtonGroup.Root>

          <div
            onClick={event => {
              if (aRef.current == null) return;
              const { node: editNode } = getParentNodeWithClassName(event, 'search-chord-edit-button');

              if (editNode) {
                const editChord = editNode.parentElement?.getAttribute('data-search-chord');
                if (!editChord) return;

                navigate({ to: '/cm/edit/chord', search: { newChordName: editChord } });
                isOpenAtom.reset();

                return;
              }

              const { node } = getParentNodeWithClassName(event, 'search-chord');

              const searchChord = node?.getAttribute('data-search-chord');
              if (!searchChord) return;

              aRef.current.href = `https://www.google.com/search?q=guitar+chord+image+аккорд+на+гитаре+${encodeURIComponent(searchChord)}`;
              aRef.current.click();
              lastClickedChordAtom.set(searchChord);
            }}
          >
            {unknownChords}
          </div>
        </StyledModalBody>
      </Modal>
    </>
  );
};

const simpleChords = ['A', 'C', 'D', 'E', 'F', 'G', 'H'];

const StyledModalBody = styled(ModalBody)<{ $lastClickedChord: string; $isLastChordExists: boolean }>`
  [data-search-chord='${props => props.$lastClickedChord}'] {
    border: 2px var(--color--7) solid;
    ${props =>
      props.$isLastChordExists &&
      css`
        color: var(--color--7);
      `}
  }

  ${simpleChords.map(
    (chord, chordi, chorda) => css`
      [data-search-chord^='${chord}']: has(+ [data-search-chord^= '${chorda[chordi + 1]}']) {
        border-bottom: 2px var(--color--3) solid;
      }
    `,
  )}
`;
