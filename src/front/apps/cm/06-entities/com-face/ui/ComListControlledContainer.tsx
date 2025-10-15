import { ContextMenu } from '#shared/components/ui/context-menu';
import { mylib } from '#shared/lib/my-lib';
import { useCmComLastOpenComw } from '$cm/entities/com';
import { useState } from 'react';
import { CmComWid } from 'shared/api';
import { cmComFaceCurrentComwIdPrefix } from '../const/ids';
import { StyledCmComFaceList } from '../style/StyledComList';
import { CmComFaceListProps } from './_ComList';
import { CmComFaceContextMenu } from './ComFaceContextMenu';
import { CmComFaceListPreviousSibling } from './StyledComListPrevious';

interface Props extends CmComFaceListProps {
  children: React.ReactNode;
  listRef: React.RefObject<HTMLDivElement | null>;
}

export const CmComFaceListControlledContainer = (props: Props) => {
  const [selectedComw, setSelectedComw] = useState<CmComWid | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const lastOpenComw = useCmComLastOpenComw();

  const onPoinertDown = (event: { target: unknown }) => {
    if (props.selectable === false) return;
    let foundElementWithFaceItemClassName = event.target as HTMLElement | null;

    while (foundElementWithFaceItemClassName) {
      if (foundElementWithFaceItemClassName.classList.contains('face-item')) break;
      foundElementWithFaceItemClassName = foundElementWithFaceItemClassName.parentElement;
    }

    if (!foundElementWithFaceItemClassName?.id.startsWith(cmComFaceCurrentComwIdPrefix)) return;

    const comw = +foundElementWithFaceItemClassName.id.slice(cmComFaceCurrentComwIdPrefix.length);

    if (mylib.isNaN(comw)) return;

    setSelectedComw(comw);
  };

  return (
    <>
      <ContextMenu.Root onOpenChange={setIsSelected}>
        <ContextMenu.Trigger>
          <CmComFaceListPreviousSibling />
          <StyledCmComFaceList
            $ccomw={lastOpenComw}
            $accentComw={isSelected ? selectedComw : null}
            $comTitles={props.titles}
            className={props.className}
            ref={props.listRef}
            onMouseDown={onPoinertDown}
            onTouchStart={onPoinertDown}
          >
            {props.children}
          </StyledCmComFaceList>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          {selectedComw && (
            <CmComFaceContextMenu
              onClick={setSelectedComw}
              comWid={selectedComw}
            />
          )}
        </ContextMenu.Content>
      </ContextMenu.Root>
    </>
  );
};
