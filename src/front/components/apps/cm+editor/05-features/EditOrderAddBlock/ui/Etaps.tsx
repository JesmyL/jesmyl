import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalFooter } from '#shared/ui/modal/Modal/ModalFooter';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { CmTextableBlockAnchorTitles } from '$cm+editor/entities/TextableBlockAnchorTitles';
import { useEffect, useState } from 'react';
import { comBlockStyles } from 'shared/values/cm/block-styles/BlockStyles';
import { StyleBlock } from 'shared/values/cm/block-styles/StyleBlock';
import { cmNewOrderMakeEtapQueue } from '../lib/consts';
import { CmNewOrderMakeEtap } from '../model';

type Props = {
  com: EditableCom;
  onClose: (is: false) => void;
  firstEtap: CmNewOrderMakeEtap;
  onOrderBuilt: (styleBlock: StyleBlock, chordi: number, texti?: number) => void;
};

export const OrdersRedactorAdditionsEtapsModalInner = ({ com, onClose, firstEtap, onOrderBuilt }: Props) => {
  const [etap, setEtap] = useState(firstEtap);

  const [selectedTexti, setTexti] = useState<number | und>();
  const [selectedChordi, setChordi] = useState(0);
  const [selectedStyleBlock, setStyleBlock] = useState<StyleBlock | null>(null);

  useEffect(() => {
    if (etap !== CmNewOrderMakeEtap.Off || selectedStyleBlock === null) return;

    onOrderBuilt(selectedStyleBlock, selectedChordi, selectedTexti);
    onClose(false);
  }, [selectedChordi, etap, onOrderBuilt, selectedTexti, selectedStyleBlock, onClose]);

  const nextEtapFooter = (
    <ModalFooter>
      <TheIconButton
        icon="ArrowRight01"
        prefix="Следующий этап"
        disabled={
          etap === CmNewOrderMakeEtap.Text
            ? selectedTexti == null
            : etap === CmNewOrderMakeEtap.Type && selectedStyleBlock === null
        }
        onClick={() => setEtap(cmNewOrderMakeEtapQueue[cmNewOrderMakeEtapQueue.indexOf(etap) + 1])}
      />
    </ModalFooter>
  );

  switch (etap) {
    case CmNewOrderMakeEtap.Text:
      return (
        <>
          <ModalHeader>Текст для нового блока</ModalHeader>
          <ModalBody>
            {com?.texts?.map((text, texti) => {
              return (
                <div key={texti}>
                  <CmTextableBlockAnchorTitles
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
    case CmNewOrderMakeEtap.Chord:
      return (
        <>
          <ModalHeader>Блок аккордов</ModalHeader>
          <ModalBody>
            {com?.chords?.map((chord, chordi) => {
              return (
                <div key={chordi}>
                  <CmTextableBlockAnchorTitles
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
    case CmNewOrderMakeEtap.Type:
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
                  className="margin-gap-t"
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
