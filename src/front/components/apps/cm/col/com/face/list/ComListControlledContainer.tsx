import { propsOfClicker } from '#shared/lib/clicker/propsOfClicker';
import { mylib } from '#shared/lib/my-lib';
import { FloatPopup } from '#shared/ui/popup/FloatPopup';
import { useFloatPopupCoords } from '#shared/ui/popup/FloatPopup/lib';
import { useLastOpenComw } from '$cm/basis/lib/com-selections';
import { useMemo } from 'react';
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
  const [floatMenuCoords, setFloatMenuCoords] = useFloatPopupCoords<{ comw: CmComWid }>();
  const lastOpenComw = useLastOpenComw();

  const clickerProps = useMemo(
    () =>
      propsOfClicker({
        onCtxMenu: event => {
          event.preventDefault();

          if (props.selectable === false) return;
          let foundElementWithFaceItemClassName = event.target as HTMLElement | null;

          while (foundElementWithFaceItemClassName) {
            if (foundElementWithFaceItemClassName.classList.contains('face-item')) break;
            foundElementWithFaceItemClassName = foundElementWithFaceItemClassName.parentElement;
          }

          if (!foundElementWithFaceItemClassName?.id.startsWith(cmCurrentComwIdPrefix)) return;

          const comw = +foundElementWithFaceItemClassName.id.slice(cmCurrentComwIdPrefix.length);

          if (mylib.isNaN(comw)) return;

          setFloatMenuCoords({ x: event.clientX, y: event.clientY, comw });
        },
      }),
    [props.selectable, setFloatMenuCoords],
  );

  return (
    <>
      <ComListPreviousSibling />
      <StyledComList
        $ccomw={lastOpenComw}
        $accentComw={floatMenuCoords?.comw}
        $comTitles={props.titles}
        className={props.className}
        ref={props.listRef}
        {...clickerProps}
      >
        {props.children}
      </StyledComList>
      {floatMenuCoords && (
        <FloatPopup
          onClose={setFloatMenuCoords}
          coords={floatMenuCoords}
        >
          <ComFaceContextMenu
            onClick={setFloatMenuCoords}
            comWid={floatMenuCoords.comw}
          />
        </FloatPopup>
      )}
    </>
  );
};
