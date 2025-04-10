import { useInvocatedValue } from '#basis/lib/useInvocatedValue';
import { atom, useAtomValue } from '#shared/lib/atom';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { cmEditComClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { Com } from '$cm/col/com/Com';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { TheCom } from '$cm/col/com/TheCom';
import { useMemo } from 'react';
import { CmComWid } from 'shared/api';
import { emptyArray } from 'shared/utils';

const openComwAtom = atom<CmComWid | null>(null);

export const RemovedComsModalInner = () => {
  const openComw = useAtomValue(openComwAtom);

  const [icoms] = useInvocatedValue(
    emptyArray,
    ({ aborter }) => cmEditComClientInvocatorMethods.takeRemovedComs(undefined, { aborter }),
    emptyArray,
  );

  const coms = useMemo(() => icoms.map(icom => new Com(icom)), [icoms]);

  return (
    <>
      <ModalHeader>Удалённые песни</ModalHeader>
      <ModalBody>
        <ComFaceList
          list={coms}
          importantOnClick={({ com }) => openComwAtom.set(com.wid)}
          comDescription={comControls}
        />
      </ModalBody>

      <Modal openAtom={openComwAtom}>
        <ModalBody>
          <TheCom com={coms.find(com => com.wid === openComw)} />
        </ModalBody>
      </Modal>
    </>
  );
};

const comControls = (com: Com) => (
  <div className="flex flex-gap">
    <TheIconSendButton
      icon="PlusSignCircle"
      className="color--ok"
      confirm="Восстановить эту песню?"
      onSend={() => cmEditComClientInvocatorMethods.bringBackToLife({ comw: com.wid })}
    />
    <TheIconSendButton
      icon="CancelCircleHalfDot"
      className="color--ko"
      confirm="Уничтожить эту песню?"
      onSend={() => cmEditComClientInvocatorMethods.destroy({ comw: com.wid })}
    />
  </div>
);
