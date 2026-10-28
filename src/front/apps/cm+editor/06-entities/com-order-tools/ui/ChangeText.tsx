import { translateEditorBase } from '#basis/locale';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { TheCmComOrder } from '$cm/ext';
import { Atom, atom } from 'atomaric';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { CmEditorComOrderToolsProps } from '../model';

let isModalOpenAtom: Atom<boolean>;

export const CmEditorComOrderToolsChangeText = ({ com, ord, ordi }: CmEditorComOrderToolsProps) => {
  isModalOpenAtom ??= atom(false);

  const blockHeaderHtml = (textPre = '') =>
    `${textPre && `${textPre} `}${ord.isEmptyHeader ? <s>{ord.me.header()}</s> : ord.me.header()}`;

  return (
    <>
      <BottomPopupItem
        icon="Text"
        title={translateEditorBase(EditorLocaleKey.CmEditorReplaceText)}
        onClick={isModalOpenAtom.do.toggle}
      />

      <Modal openAtom={isModalOpenAtom}>
        <ModalHeader>{blockHeaderHtml(translateEditorBase(EditorLocaleKey.CmEditorTextForBlock))}</ModalHeader>
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
                    comw: com.wid,
                    ordw: ord.wid,
                    texti,
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
