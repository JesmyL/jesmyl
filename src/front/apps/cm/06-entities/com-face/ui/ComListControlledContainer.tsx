import { ContextMenu } from '#shared/components/ui/context-menu';
import { ReactNode, RefObject, useState } from 'react';
import { CmComWid } from 'shared/api';
import { checkIsNaN } from 'shared/utils/checkIs';
import { cmComFaceCurrentComwIdPrefix } from '../const/ids';
import { useCmComFaceCurrentComw } from '../lib/useCurrentComw';
import { StyledCmComFaceList } from '../style/StyledComList';
import { CmComFaceListProps } from '../model/model';
import { CmComFaceContextMenu } from './ComFaceContextMenu';
import { CmComFaceListPreviousSibling } from './StyledComListPrevious';

interface Props extends CmComFaceListProps {
  children: ReactNode;
  listRef: RefObject<HTMLDivElement | null>;
}

export const CmComFaceListControlledContainer = (props: Props) => {
  const [selectedComw, setSelectedComw] = useState<CmComWid | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const currentComw = useCmComFaceCurrentComw(props);

  const onPoinertDown = (event: { target: unknown }) => {
    if (props.selectable === false) return;
    let foundElementWithFaceItemClassName = event.target as HTMLElement | null;

    while (foundElementWithFaceItemClassName) {
      if (foundElementWithFaceItemClassName.classList.contains('face-item')) break;
      foundElementWithFaceItemClassName = foundElementWithFaceItemClassName.parentElement;
    }

    if (!foundElementWithFaceItemClassName?.id.startsWith(cmComFaceCurrentComwIdPrefix)) return;

    const comw = +foundElementWithFaceItemClassName.id.slice(cmComFaceCurrentComwIdPrefix.length) as CmComWid;

    if (checkIsNaN(comw)) return;

    setSelectedComw(comw);
  };

  return (
    <>
      <ContextMenu.Root onOpenChange={setIsSelected}>
        <ContextMenu.Trigger>
          <CmComFaceListPreviousSibling />
          <StyledCmComFaceList
            $ccomw={currentComw}
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
