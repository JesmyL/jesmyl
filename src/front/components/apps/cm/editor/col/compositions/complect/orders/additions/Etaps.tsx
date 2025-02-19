import { IconButton, IconCheckbox } from '#shared/ui/icon';
import { ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { blockStyles } from 'front/components/apps/cm/col/com/block-styles/BlockStyles';
import { StyleBlock } from 'front/components/apps/cm/col/com/block-styles/StyleBlock';
import { useEffect, useState } from 'react';
import { EditableCom } from '../../../com/EditableCom';
import { CmTextableBlockAnchorTitles } from '../../textable-blocks/CmTextableBlockAnchorTitles';
import { CmNewOrderMakeEtap, cmNewOrderMakeEtapQueue } from './values';

export const OrdersRedactorAdditionsEtapsModalInner = ({
  com,
  onClose,
  firstEtap,
  onOrderBuilt,
}: {
  com: EditableCom;
  onClose: (is: false) => void;
  firstEtap: CmNewOrderMakeEtap;
  onOrderBuilt: (styleBlock: StyleBlock, chordi: number, texti?: number) => void;
}) => {
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
      <IconButton
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
                    postfix={<pre>{com.transBlock(chord)}</pre>}
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
            {blockStyles?.styles.map(styleBlock => {
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
