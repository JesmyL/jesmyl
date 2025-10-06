import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { ScheduleDayEventAttachmentScopeProps, ScheduleWidgetAppAttCustomizableValueItem } from 'shared/api';
import { twMerge } from 'tailwind-merge';
import { ScheduleWidgetKeyValueItemGrabber } from '../lib/itemGrabber';

interface Props {
  dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps;
  itemMi: number;
  value: ScheduleWidgetAppAttCustomizableValueItem[1];
}

export const ScheduleWidgetKeyValueListAttPositionControls = ({ dayEventAttScopeProps, itemMi, value }: Props) => {
  return (
    <div className={twMerge('flex gap-1 relative z-15 text-x7', mylib.isStr(value) && 'mr-7')}>
      <ScheduleWidgetKeyValueItemGrabber.Grab
        value={itemMi}
        render={({ className, onGrab }) => (
          <>
            <Button
              size="icon"
              className={className}
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

            <Button
              icon="Hold01"
              className={className}
              onClick={() => onGrab(itemMi)}
            />
          </>
        )}
        renderDrop={({ className, onDrop }) => (
          <Button
            icon="PinLocation01"
            className={className}
            onClick={() => onDrop(itemMi)}
            attr-id={itemMi}
          />
        )}
        renderStop={({ className, onStop }) => (
          <Button
            icon="Unavailable"
            className={className}
            onClick={onStop}
          />
        )}
      />
    </div>
  );
};
