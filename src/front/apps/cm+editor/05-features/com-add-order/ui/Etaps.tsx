import { ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { CmEditorComOrderAddTextableBlockAnchorTitles } from '$cm+editor/features/com-order';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { useEffect, useState } from 'react';
import { comBlockStyles } from 'shared/values/cm/block-styles/BlockStyles';
import { StyleBlock } from 'shared/values/cm/block-styles/StyleBlock';
import { cmEditorComAddOrderNewOrderMakeEtapQueue } from '../lib/consts';
import { CmEditorComAddOrderNewOrderMakeEtap } from '../model';

type Props = {
  com: EditableCom;
  onClose: (is: false) => void;
  firstEtap: CmEditorComAddOrderNewOrderMakeEtap;
  onOrderBuilt: (styleBlock: StyleBlock, chordi: number, texti?: number) => void;
};

export const CmEditorComAddOrderAdditionsEtapsModalInner = ({ com, onClose, firstEtap, onOrderBuilt }: Props) => {
  const [etap, setEtap] = useState(firstEtap);

  const [selectedTexti, setTexti] = useState<number | und>();
  const [selectedChordi, setChordi] = useState(0);
  const [selectedStyleBlock, setStyleBlock] = useState<StyleBlock | null>(null);

  useEffect(() => {
    if (etap !== CmEditorComAddOrderNewOrderMakeEtap.Off || selectedStyleBlock === null) return;

    onOrderBuilt(selectedStyleBlock, selectedChordi, selectedTexti);
    onClose(false);
  }, [selectedChordi, etap, onOrderBuilt, selectedTexti, selectedStyleBlock, onClose]);

  const nextEtapFooter = (
    <ModalFooter>
      <TheIconButton
        icon="ArrowRight01"
        prefix="Следующий этап"
        disabled={
          etap === CmEditorComAddOrderNewOrderMakeEtap.Text
            ? selectedTexti == null
            : etap === CmEditorComAddOrderNewOrderMakeEtap.Type && selectedStyleBlock === null
        }
        onClick={() =>
          setEtap(cmEditorComAddOrderNewOrderMakeEtapQueue[cmEditorComAddOrderNewOrderMakeEtapQueue.indexOf(etap) + 1])
        }
      />
    </ModalFooter>
  );

  switch (etap) {
    case CmEditorComAddOrderNewOrderMakeEtap.Text:
      return (
        <>
          <ModalHeader>Текст для нового блока</ModalHeader>
          <ModalBody>
            {com?.texts?.map((text, texti) => {
              return (
                <div key={texti}>
                  <CmEditorComOrderAddTextableBlockAnchorTitles
                    texti={texti}
                    com={com}
                  />
                  <IconCheckbox
                    key={texti}
                    className="pointer"
                    disabled={selectedTexti === texti}
                    checked={selectedTexti === texti}
                    onChange={() => setTexti(texti)}
                    postfix={<pre>{text}</pre>}
                  />
                </div>
              );
            })}
          </ModalBody>
          {nextEtapFooter}
        </>
      );
    case CmEditorComAddOrderNewOrderMakeEtap.Chord:
      return (
        <>
          <ModalHeader>Блок аккордов</ModalHeader>
          <ModalBody>
            {com?.chords?.map((chord, chordi) => {
              return (
                <div key={chordi}>
                  <CmEditorComOrderAddTextableBlockAnchorTitles
                    chordi={chordi}
                    com={com}
                  />
                  <IconCheckbox
                    className="pointer"
                    disabled={selectedChordi === chordi}
                    checked={selectedChordi === chordi}
                    onChange={() => setChordi(chordi)}
                    postfix={<pre>{com.transposeBlock(chord)}</pre>}
                  />
                </div>
              );
            })}
          </ModalBody>
          {nextEtapFooter}
        </>
      );
    case CmEditorComAddOrderNewOrderMakeEtap.Type:
      return (
        <>
          <ModalHeader>Тип нового блока</ModalHeader>
          <ModalBody>
            {comBlockStyles.styles.map(styleBlock => {
              if (selectedTexti == null ? styleBlock.isBlockForTextableOnly : styleBlock.isBlockForChordedOnly)
                return null;
              const typeTitle = styleBlock.title[com.langi || 0];

              return (
                <IconCheckbox
                  key={styleBlock.key}
                  checked={styleBlock === selectedStyleBlock}
                  disabled={styleBlock === selectedStyleBlock}
                  className="mt-2"
                  onChange={() => setStyleBlock(styleBlock)}
                  postfix={typeTitle}
                />
              );
            })}
          </ModalBody>
          {nextEtapFooter}
        </>
      );
  }
};
