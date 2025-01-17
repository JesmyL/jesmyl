import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import {
  ScheduleWidgetAppAttCustomizable,
  ScheduleWidgetAppAttCustomized,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import { IconArrowRight01StrokeRounded } from '../../../../complect/the-icon/icons/arrow-right-01';
import { IconAttachment02StrokeRounded } from '../../../../complect/the-icon/icons/attachment-02';
import { IconPlusSignStrokeRounded } from '../../../../complect/the-icon/icons/plus-sign';
import useModal from '../../../modal/useModal';
import IconButton from '../../../the-icon/IconButton';
import ScheduleWidgetCustomAtt from './CustomAtt';

const newTatt: ScheduleWidgetAppAttCustomizable = {
  description: '',
  icon: 'Attachment',
  initVal: {},
  title: '',
  R: scheduleWidgetUserRights.includeRights(ScheduleWidgetUserRoleRight.Redact),
  U: scheduleWidgetUserRights.includeRights(ScheduleWidgetUserRoleRight.Redact),
};

export default function ScheduleWidgetCustomAttachments(props: { tatts: ScheduleWidgetAppAttCustomized[] }) {
  const [modalNode, screen] = useModal(({ header, body }) => {
    return (
      <>
        {header(
          <div className="flex full-width between">
            Шаблоны вложений
            {!props.tatts.some(att => !att.title || !att.description) && (
              <EvaSendButton
                // fieldName="tatts"
                // fieldValue={newTatt}
                Icon={IconPlusSignStrokeRounded}
                confirm="Создать шаблон вложения?"
                onSend={async () => {}}
              />
            )}
          </div>,
        )}
        {body(
          props.tatts.map(tatt => {
            return (
              <ScheduleWidgetCustomAtt
                key={tatt.mi}
                tatt={tatt}
              />
            );
          }),
        )}
      </>
    );
  });

  return (
    <div>
      {modalNode}
      <IconButton
        Icon={IconAttachment02StrokeRounded}
        postfix={
          <>
            Шаблоны вложений
            <IconArrowRight01StrokeRounded />
          </>
        }
        onClick={screen}
        className="flex-max margin-gap-v"
      />
    </div>
  );
}
