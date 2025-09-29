import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { ScheduleDayEventAttachmentScopeProps, ScheduleWidgetAppAttCustomizableValueItem } from 'shared/api';
import { twMerge } from 'tailwind-merge';
import { ScheduleWidgetKeyValueItemGrabber } from '../lib/itemGrabber';

export const ScheduleWidgetKeyValueListAttPositionControls = ({
  dayEventAttScopeProps,
  itemMi,
  value,
}: {
  dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps;
  itemMi: number;
  value: ScheduleWidgetAppAttCustomizableValueItem[1];
}) => {
  return (
    <div className={twMerge('flex', mylib.isStr(value) && 'mr-7')}>
      <ScheduleWidgetKeyValueItemGrabber.Grab
        value={itemMi}
        render={({ className, onGrab }) => (
          <Button
            icon="Hold01"
            className={twMerge(className, 'ml-1 relative z-15 text-x7')}
            onClick={() => onGrab(itemMi)}
          />
        )}
        renderDrop={({ className, onDrop }) => (
          <Button
            icon="PinLocation01"
            className={twMerge(className, 'ml-1 relative z-15 text-x7')}
            onClick={() => onDrop(itemMi)}
          />
        )}
        renderStop={({ className, onStop }) => (
          <Button
            icon="Unavailable"
            className={twMerge(className, 'ml-1 relative z-15 text-x7')}
            onClick={onStop}
          />
        )}
      />

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
