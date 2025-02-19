import { BottomPopupItem } from '#shared/ui/absolute-popup/bottom-popup/BottomPopupItem';
import { IconCheckbox } from '#shared/ui/icon';
import { useModal } from '#shared/ui/modal';
import { TheOrder } from 'front/components/apps/cm/col/com/order/TheOrder';
import { cmComOrderClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { ChordVisibleVariant } from '../../../../../../Cm.model';
import { OrdersRedactorOrderToolsProps } from '../OrdersRedactorOrderTools';

export const OrdersRedactorOrderToolsChordBind = ({ com, ord, ordi, onClose }: OrdersRedactorOrderToolsProps) => {
  const [modalNode, openModal] = useModal(({ header, body }, close) => {
    return (
      <>
        {header(<>Аккорды</>)}
        {body(
          <>
            <pre style={{ whiteSpace: 'normal' }}>
              <b>Устанавливаем Аккорды для блока</b>
              <br />
              <br />
              <TheOrder
                orderUnit={ord}
                orderUniti={ordi}
                com={com}
                chordVisibleVariant={ChordVisibleVariant.Maximal}
              />
            </pre>
            {com.chords?.map((chordsBlock, chordsBlocki) => {
              const targetOrd = ord.me.targetOrd;

              const chordIndex =
                targetOrd && (ord.chordsi == null || ord.chordsi === -1) ? targetOrd.chordsi : ord.chordsi;

              return (
                <IconCheckbox
                  key={chordsBlocki}
                  checked={chordsBlocki === chordIndex}
                  disabled={chordsBlocki === chordIndex}
                  className="margin-gap-t"
                  onChange={() => {
                    close();
                    onClose(false);
                  }}
                  onClick={() =>
                    cmComOrderClientInvocatorMethods.bindChordBlock(
                      null,
                      ord.wid,
                      ord.me.header(),
                      com.wid,
                      chordsBlocki,
                      ord.isAnchor ? 1 : 0,
                    )
                  }
                  postfix={
                    <pre>
                      <b>{chordsBlocki + 1}</b>
                      <br />
                      {com.transBlock(chordsBlock)}
                    </pre>
                  }
                />
              );
            })}
          </>,
        )}
      </>
    );
  });

  return (
    <>
      {modalNode}
      <BottomPopupItem
        icon="Playlist03"
        title="Аккорды"
        onClick={openModal}
      />
    </>
  );
};
