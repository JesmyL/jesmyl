import { Button } from '#shared/components/ui/button';
import { EllipsisText } from '#shared/ui/EllipsisText';
import { QrReader } from '#shared/ui/qr-code/QrReader';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { atom } from 'atomaric';
import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';

const isQrReaderOpenAtom = atom(false);

export const StoragesRackCardMetaInfoReader = ({
  card,
  rack,
  isEdit,
}: {
  card: StoragesRackCard;
  rack: StoragesRack;
  isEdit: boolean;
}) => {
  return (
    <>
      <div className="flex gap-3">
        <Button
          icon="QrCode"
          onClick={isEdit ? isQrReaderOpenAtom.do.toggle : undefined}
        >
          {card.meta ? (
            <EllipsisText
              text={card.meta}
              maxLength={10}
              cantExtend
            />
          ) : (
            <span className="text-xKO">&times;</span>
          )}
        </Button>
        {card.meta && isEdit && (
          <TheIconButton
            icon="Delete01"
            className="text-xKO"
            confirm="Удалить мета-информацию?"
            onClick={() => storagesTsjrpcClient.editRackCardMeta({ rackw: rack.w, meta: '', cardMi: card.mi })}
          />
        )}
      </div>

      <QrReader
        openAtom={isQrReaderOpenAtom}
        formats={['any']}
        onReadData={meta => {
          storagesTsjrpcClient.editRackCardMeta({ rackw: rack.w, meta, cardMi: card.mi });
          isQrReaderOpenAtom.reset();
        }}
      />
    </>
  );
};
