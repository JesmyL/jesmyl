import { translateBase, translateDynamic } from '#basis/locale';
import { ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { CmEditorComOrderAddTextableBlockAnchorTitles } from '$cm+editor/features/com-order';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { useEffect, useState } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { DynLocaleKey } from 'shared/model/+locale/_DynLocaleKey';
import { comBlockKinds } from 'shared/values/cm/block-kinds/BlockKind';
import { KindBlock } from 'shared/values/cm/block-kinds/KindBlock';
import { cmEditorComAddOrderNewOrderMakeEtapQueue } from '../lib/consts';
import { CmEditorComAddOrderNewOrderMakeEtap } from '../model';

type Props = {
  com: EditableCom;
  onClose: (is: false) => void;
  firstEtap: CmEditorComAddOrderNewOrderMakeEtap;
  onOrderBuilt: (kindBlock: KindBlock, chordi: number, texti?: number) => void;
};

export const CmEditorComAddOrderAdditionsEtapsModalInner = ({ com, onClose, firstEtap, onOrderBuilt }: Props) => {
  const [etap, setEtap] = useState(firstEtap);

  const [selectedTexti, setTexti] = useState<number | und>();
  const [selectedChordi, setChordi] = useState(0);
  const [selectedStyleBlock, setStyleBlock] = useState<KindBlock | null>(null);

  useEffect(() => {
    if (etap !== CmEditorComAddOrderNewOrderMakeEtap.Off || selectedStyleBlock === null) return;

    onOrderBuilt(selectedStyleBlock, selectedChordi, selectedTexti);
    onClose(false);
  }, [selectedChordi, etap, onOrderBuilt, selectedTexti, selectedStyleBlock, onClose]);

  const nextEtapFooter = (
    <ModalFooter>
      <TheIconButton
        icon="ArrowRight01"
        prefix={translateBase(BaseLocaleKey.CmEditorNextStage)}
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
          <ModalHeader>{translateBase(BaseLocaleKey.CmEditorNewBlockText)}</ModalHeader>
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
          <ModalHeader>{translateBase(BaseLocaleKey.CmEditorChordBlock)}</ModalHeader>
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
    case CmEditorComAddOrderNewOrderMakeEtap.Type: {
      const td = translateDynamic(com.langi);

      return (
        <>
          <ModalHeader>{translateBase(BaseLocaleKey.CmEditorNewBlockType)}</ModalHeader>
          <ModalBody>
            {comBlockKinds.kinds.map(styleBlock => {
              if (selectedTexti == null ? styleBlock.isBlockForTextableOnly : styleBlock.isBlockForChordedOnly)
                return null;
              const orderTitle = td(it => it[DynLocaleKey.CmComKind][styleBlock.key]);

              return (
                <IconCheckbox
                  key={styleBlock.key}
                  checked={styleBlock === selectedStyleBlock}
                  disabled={styleBlock === selectedStyleBlock}
                  className="mt-2"
                  onChange={() => setStyleBlock(styleBlock)}
                  postfix={orderTitle}
                />
              );
            })}
          </ModalBody>
          {nextEtapFooter}
        </>
      );
    }
  }
};
