import { translateBase } from '#basis/locale';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmComSelectedComwsAtom } from '$cm/entities/com';
import { CmComFaceList } from '$cm/entities/com-face';
import { Atom, atom, useAtomValue } from 'atomaric';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

let isOpenSelectedComsAtom: Atom<boolean>;

export const CmMeetingSelectedComsMenuItem = () => {
  const selectedComws = useAtomValue(cmComSelectedComwsAtom);
  isOpenSelectedComsAtom ??= atom(false);

  return (
    !selectedComws.length || (
      <BottomPopupItem
        icon="CheckmarkBadge01"
        title={translateBase(BaseLocaleKey.Selected)}
        onClick={isOpenSelectedComsAtom.do.toggle}
      />
    )
  );
};

export const CmMeetingSelectedComsPopup = () => {
  const selectedComws = useAtomValue(cmComSelectedComwsAtom);
  isOpenSelectedComsAtom ??= atom(false);

  return (
    !selectedComws.length || (
      <Modal
        openAtom={isOpenSelectedComsAtom}
        isRenderHere
      >
        <ModalHeader>{translateBase(BaseLocaleKey.Selected)}</ModalHeader>
        <ModalBody>
          <CmComFaceList list={selectedComws} />
        </ModalBody>
      </Modal>
    )
  );
};
