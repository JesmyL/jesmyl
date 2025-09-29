import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { ScheduleDayEventAttachmentScopeProps, ScheduleWidgetAppAttCustomizableValueItem } from 'shared/api';
import { twMerge } from 'tailwind-merge';

export const ScheduleWidgetKeyValueListAttPositionControls = ({
  items,
  dayEventAttScopeProps,
  itemMi,
  itemi,
  value,
}: {
  items: ScheduleWidgetAppAttCustomizableValueItem[];
  dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps;
  itemMi: number;
  itemi: number;
  value: ScheduleWidgetAppAttCustomizableValueItem[1];
}) => {
  return (
    <div className={twMerge('flex', mylib.isStr(value) && 'mr-7')}>
      {items.length > 1 && itemi > 0 && (
        <Button
          size="icon"
          className="ml-1"
        >
          <TheIconSendButton
            icon="ArrowDataTransferVertical"
            className="relative z-15 text-x7"
            onSend={() => schDayEventsTsjrpcClient.moveKeyValueAttachment({ props: dayEventAttScopeProps, itemMi })}
          />
        </Button>
      )}
      <Button
        size="icon"
        className="ml-1"
      >
        <TheIconSendButton
          className="relative z-15 text-xKO"
          confirm="Удалить пункт?"
          icon="Delete02"
          onSend={() =>
            schDayEventsTsjrpcClient.putKeyValueAttachment({
              props: dayEventAttScopeProps,
              key: itemMi,
              value: null,
            })
          }
        />
      </Button>
    </div>
  );
};
