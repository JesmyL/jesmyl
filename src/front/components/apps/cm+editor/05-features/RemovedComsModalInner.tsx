import { useInvocatedValue } from '#basis/lib/useInvocatedValue';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { Com } from '$cm/col/com/Com';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { TheCom } from '$cm/col/com/TheCom';
import { atom } from 'atomaric';
import { useMemo } from 'react';
import { CmComWid } from 'shared/api';
import { emptyArray } from 'shared/utils';

const openComwAtom = atom<CmComWid | null>(null);

export const RemovedComsModalInner = () => {
  const [icoms] = useInvocatedValue(
    emptyArray,
    ({ aborter }) => cmEditComClientTsjrpcMethods.takeRemovedComs(undefined, { aborter }),
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

      <Modal
        openAtom={openComwAtom}
        checkIsOpen={it => it != null}
      >
        {openComw => (
          <ModalBody>
            <TheCom com={coms.find(com => com.wid === openComw)} />
          </ModalBody>
        )}
      </Modal>
    </>
  );
};

const comControls = (com: Com) => (
  <div className="flex gap-2">
    <TheIconSendButton
      icon="PlusSignCircle"
      className="text-xOK"
      confirm="Восстановить эту песню?"
      onSend={() => cmEditComClientTsjrpcMethods.bringBackToLife({ comw: com.wid })}
    />
    <TheIconSendButton
      icon="CancelCircleHalfDot"
      className="text-xKO"
      confirm="Уничтожить эту песню?"
      onSend={() => cmEditComClientTsjrpcMethods.destroy({ comw: com.wid })}
    />
  </div>
);
