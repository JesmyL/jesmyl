import { translateBase } from '#basis/locale';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComFaceList, TheCmCom } from '$cm/ext';
import { useQuery } from '@tanstack/react-query';
import { Atom, atom } from 'atomaric';
import { CmComWid, IExportableCom } from 'shared/api';

let openComwAtom: Atom<CmComWid | null>;

export const CmEditorComRemovedComsModalInner = () => {
  openComwAtom ??= atom<CmComWid | null>(null);

  const { data: icoms } = useQuery({
    queryKey: ['takeRemovedComs'],
    queryFn: () => cmEditComClientTsjrpcMethods.takeRemovedComs(),
  });

  const comControls = (com: IExportableCom) => (
    <div className="flex gap-2">
      <TheIconSendButton
        icon="PlusSignCircle"
        className="text-xOK"
        confirm={translateBase(it => it.cm.com.backup)}
        onSend={() => cmEditComClientTsjrpcMethods.bringBackToLife({ comw: com.w })}
      />
      <TheIconSendButton
        icon="CancelCircleHalfDot"
        className="text-xKO"
        confirm={translateBase(it => it.cm.com.destroy)}
        onSend={() => cmEditComClientTsjrpcMethods.destroy({ comw: com.w })}
      />
    </div>
  );

  return (
    <>
      <ModalHeader>{translateBase(it => it.cm.com.rms)}</ModalHeader>
      <ModalBody>
        <CmComFaceList
          list={icoms}
          importantOnClick={({ com }) => openComwAtom.set(com.w)}
          comDescription={comControls}
        />
      </ModalBody>

      <Modal
        openAtom={openComwAtom}
        checkIsOpen={it => it != null}
      >
        {openComw => (
          <ModalBody>
            <TheCmCom comw={icoms?.find(com => com.w === openComw)?.w} />
          </ModalBody>
        )}
      </Modal>
    </>
  );
};
