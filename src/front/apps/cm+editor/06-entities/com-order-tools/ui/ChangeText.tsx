import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { ChordVisibleVariant, TheCmComOrder } from '$cm/ext';
import { atom } from 'atomaric';
import { CmEditorComOrderToolsProps } from '../model';

const isModalOpenAtom = atom(false);
export const CmEditorComOrderToolsChangeText = ({ com, ord, ordi }: CmEditorComOrderToolsProps) => {
  const blockHeaderHtml = (textPre = '') =>
    `${textPre && `${textPre} `}${ord.isEmptyHeader ? <s>{ord.me.header()}</s> : ord.me.header()}`;

  return (
    <>
      <BottomPopupItem
        icon="Text"
        title="Заменить текст"
        onClick={isModalOpenAtom.do.toggle}
      />

      <Modal openAtom={isModalOpenAtom}>
        <ModalHeader>{blockHeaderHtml('Текстовый блок для блока')}</ModalHeader>
        <ModalBody>
          <TheCmComOrder
            ord={ord}
            ordi={ordi}
            chordVisibleVariant={ChordVisibleVariant.Maximal}
            com={com}
          />
          {com.texts?.map((text, texti) => {
            if (!text) return null;

            return (
              <IconCheckbox
                key={texti}
                className="mt-2"
                disabled={ord.texti === texti}
                checked={ord.texti === texti}
                postfix={
                  <>
                    <b>{texti + 1}</b>
                    <pre>{text}</pre>
                  </>
                }
                onChange={isModalOpenAtom.reset}
                onClick={() =>
                  cmEditComOrderClientTsjrpcMethods.setTexti({
                    orderTitle: ord.me.header(),
                    comw: com.wid,
                    ordw: ord.wid,
                    texti: texti,
                  })
                }
              />
            );
          })}
        </ModalBody>
      </Modal>
    </>
  );
};
