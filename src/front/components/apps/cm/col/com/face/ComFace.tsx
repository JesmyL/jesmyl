import useAbsoluteFloatPopup from '../../../../../../complect/absolute-popup/useAbsoluteFloatPopup';
import propsOfClicker from '../../../../../../complect/clicker/propsOfClicker';
import useCmNav, { comNavPhasePoint } from '../../../base/useCmNav';
import useSelectedComs from '../../../base/useSelectedComs';
import { Com } from '../Com';
import { ComFaceInheritProps, FreeComFaceProps } from './ComFace.model';
import './ComFace.scss';
import ComFaceContextMenu from './ComFaceContextMenu';

interface Props extends ComFaceInheritProps {
  com: Com;
  comi: number;
}

interface FreeProps extends Props, FreeComFaceProps {}

export const FreeComFace = ({
  com,
  comi,
  description,
  groupClass,
  importantOnClick,
  selectable,
  jumpTo,
  closeAbsoluteFloatPopup,
  openAbsoluteFloatPopup,
  selectedComPosition,
  toggleSelectedCom,
  isWithoutIds,
}: FreeProps) => {
  return (
    <div
      id={isWithoutIds ? undefined : `com_face_wid_${com.wid}`}
      className={'face-item flex between ' + (groupClass || '') + ` com_face_wid_${com.wid}`}
      onClick={
        importantOnClick === undefined
          ? () => jumpTo({ phase: comNavPhasePoint, data: { ccomw: com.wid } })
          : () => importantOnClick(com, comi)
      }
      {...propsOfClicker({
        onCtxMenu: event => {
          event.preventDefault();
          selectable !== false &&
            openAbsoluteFloatPopup(
              <ComFaceContextMenu
                onClick={() => closeAbsoluteFloatPopup()}
                comWid={com.wid}
              />,
              event.clientX,
              event.clientY,
            );
        },
      })}
    >
      <div
        className="face-logo"
        selected-position={selectedComPosition(com.wid) || undefined}
        onClick={event => {
          event.stopPropagation();
          selectable !== false && toggleSelectedCom(com.wid);
        }}
      >
        <span>{com.number}</span>
      </div>
      <span className="face-title ellipsis">{com.name}</span>
      {description?.(com, comi)}
    </div>
  );
};

export const ComFace = (props: Props) => {
  const { jumpTo } = useCmNav();
  const { openAbsoluteFloatPopup, closeAbsoluteFloatPopup } = useAbsoluteFloatPopup();
  const { selectedComPosition, toggleSelectedCom } = useSelectedComs();

  return (
    <FreeComFace
      {...props}
      jumpTo={jumpTo}
      closeAbsoluteFloatPopup={closeAbsoluteFloatPopup}
      openAbsoluteFloatPopup={openAbsoluteFloatPopup}
      selectedComPosition={selectedComPosition}
      toggleSelectedCom={toggleSelectedCom}
    />
  );
};
