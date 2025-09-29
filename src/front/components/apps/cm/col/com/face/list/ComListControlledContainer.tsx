import { ContextMenu } from '#shared/components/ui/context-menu';
import { mylib } from '#shared/lib/my-lib';
import { useLastOpenComw } from '$cm/basis/lib/com-selections';
import { useState } from 'react';
import { CmComWid } from 'shared/api';
import { ComFaceContextMenu } from '../ComFaceContextMenu';
import { cmCurrentComwIdPrefix } from '../lib/consts';
import { ComFaceListProps } from './_ComList';
import { StyledComList } from './StyledComList';
import { ComListPreviousSibling } from './StyledComListPrevious';

interface Props extends ComFaceListProps {
  children: React.ReactNode;
  listRef: React.RefObject<HTMLDivElement | null>;
}

export const ComListControlledContainer = (props: Props) => {
  const [selectedComw, setSelectedComw] = useState<CmComWid | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const lastOpenComw = useLastOpenComw();

  const onPoinertDown = (event: { target: unknown }) => {
    if (props.selectable === false) return;
    let foundElementWithFaceItemClassName = event.target as HTMLElement | null;

    while (foundElementWithFaceItemClassName) {
      if (foundElementWithFaceItemClassName.classList.contains('face-item')) break;
      foundElementWithFaceItemClassName = foundElementWithFaceItemClassName.parentElement;
    }

    if (!foundElementWithFaceItemClassName?.id.startsWith(cmCurrentComwIdPrefix)) return;

    const comw = +foundElementWithFaceItemClassName.id.slice(cmCurrentComwIdPrefix.length);

    if (mylib.isNaN(comw)) return;

    setSelectedComw(comw);
  };

  return (
    <>
      <ContextMenu.Root onOpenChange={setIsSelected}>
        <ContextMenu.Trigger>
          <ComListPreviousSibling />
          <StyledComList
            $ccomw={lastOpenComw}
            $accentComw={isSelected ? selectedComw : null}
            $comTitles={props.titles}
            className={props.className}
            ref={props.listRef}
            onMouseDown={onPoinertDown}
            onTouchStart={onPoinertDown}
          >
            {props.children}
          </StyledComList>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          {selectedComw && (
            <ComFaceContextMenu
              onClick={setSelectedComw}
              comWid={selectedComw}
            />
          )}
        </ContextMenu.Content>
      </ContextMenu.Root>
    </>
  );
};
