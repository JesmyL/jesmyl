import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import {
  customAttUseRights,
  CustomAttUseRights,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleWidgetAppAttCustomizableValue,
  ScheduleWidgetAppAttCustomized,
} from 'shared/api';
import { itIt } from 'shared/utils';

export const scheduleWidgetKeyValueListAttMakeTitlesAdder = (
  att: ScheduleWidgetAppAttCustomized,
  attValue: ScheduleWidgetAppAttCustomizableValue,
  dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps,
) => {
  return att.titles
    ?.map((title, titlei) => {
      if (!title || attValue.values?.some(li => li[0] === title)) return null;

      return customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.CheckTitles) ? (
        <div
          key={titlei}
          className="flex gap-2"
        >
          <LazyIcon icon="CheckmarkSquare02" />
          {title}
          <TheIconSendButton
            icon="PlusSign"
            onSend={() =>
              schDayEventsTsjrpcClient.putKeyValueAttachment({
                props: dayEventAttScopeProps,
                key: false,
                value: title,
              })
            }
          />
        </div>
      ) : (
        <div
          key={titlei}
          className="flex gap-2"
        >
          {title}
          <TheIconSendButton
            icon="PlusSign"
            onSend={() =>
              schDayEventsTsjrpcClient.putKeyValueAttachment({
                props: dayEventAttScopeProps,
                key: title,
                value: '+',
              })
            }
          />
        </div>
      );
    })
    .filter(itIt);
};
