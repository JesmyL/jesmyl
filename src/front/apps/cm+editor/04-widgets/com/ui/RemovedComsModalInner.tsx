import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmCom, CmComFaceList, TheCmCom } from '$cm/ext';
import { useQuery } from '@tanstack/react-query';
import { atom } from 'atomaric';
import { useMemo } from 'react';
import { CmComWid } from 'shared/api';

const openComwAtom = atom<CmComWid | null>(null);

export const CmEditorComRemovedComsModalInner = () => {
  const { data: icoms } = useQuery({
    queryKey: ['takeRemovedComs'],
    queryFn: () => cmEditComClientTsjrpcMethods.takeRemovedComs(),
  });

  const coms = useMemo(() => icoms?.map(icom => new CmCom(icom)) ?? [], [icoms]);

  return (
    <>
      <ModalHeader>Удалённые песни</ModalHeader>
      <ModalBody>
        <CmComFaceList
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
            <TheCmCom com={coms.find(com => com.wid === openComw)} />
          </ModalBody>
        )}
      </Modal>
    </>
  );
};

const comControls = (com: CmCom) => (
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
