import { useInvocatedValue } from '#basis/lib/useInvocatedValue';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { Com } from '@cm/col/com/Com';
import { ComFaceList } from '@cm/col/com/face/list/ComFaceList';
import { TheCom } from '@cm/col/com/TheCom';
import { cmComClientInvocatorMethods } from '@cm/editor/lib/cm-editor-invocator.methods';
import { useMemo, useState } from 'react';
import { CmComWid } from 'shared/api';
import { emptyArray } from 'shared/utils';

export const RemovedComsModalInner = () => {
  const [openComw, setOpenComw] = useState<CmComWid | null>(null);
  const [icoms] = useInvocatedValue(
    emptyArray,
    aborter => cmComClientInvocatorMethods.takeRemovedComs({ aborter }),
    emptyArray,
  );

  const coms = useMemo(() => icoms.map(icom => new Com(icom)), [icoms]);

  return (
    <>
      <ModalHeader>Удалённые песни</ModalHeader>
      <ModalBody>
        <ComFaceList
          list={coms}
          importantOnClick={com => setOpenComw(com.wid)}
          comDescription={comControls}
        />
      </ModalBody>

      {openComw && (
        <Modal onClose={() => setOpenComw(null)}>
          <ModalBody>
            <TheCom com={coms.find(com => com.wid === openComw)} />
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

const comControls = (com: Com) => (
  <div className="flex flex-gap">
    <TheIconSendButton
      icon="PlusSignCircle"
      className="color--ok"
      confirm="Восстановить эту песню?"
      onSend={() => cmComClientInvocatorMethods.bringBackToLife(null, com.wid)}
    />
    <TheIconSendButton
      icon="CancelCircleHalfDot"
      className="color--ko"
      confirm="Уничтожить эту песню?"
      onSend={() => cmComClientInvocatorMethods.destroy(null, com.wid)}
    />
  </div>
);
