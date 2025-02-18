import TheIconSendButton from 'front/08-shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { ScheduleWidgetRightTexts, ScheduleWidgetRightsCtrl } from 'shared/api';
import styled from 'styled-components';

export default function ScheduleWidgetRightControlList({
  R,
  rightCtrl,
  className,
  isCantEdit,
  isDescriptionsCollect,
  isHidden,
  isReverse,
  isDisabled,
  onSend,
}: {
  R?: number;
  className?: string;
  isCantEdit?: boolean;
  rightCtrl: ScheduleWidgetRightsCtrl;
  isDescriptionsCollect?: boolean;
  onSend: (newR: number) => Promise<unknown>;
  isHidden?: (type: ScheduleWidgetRightTexts<number>, typei: number) => boolean;
  isReverse?: boolean;
  isDisabled?: (type: ScheduleWidgetRightTexts<number>, typei: number) => boolean;
}) {
  let isCan = true;

  return (
    <>
      {isDescriptionsCollect && (
        <div className="color--7 margin-gap-v  margin-gap-l">Справедливы утверждения мелким шрифтом</div>
      )}
      {rightCtrl.texts.map((type, typei) => {
        if (type.hidden || isHidden?.(type, typei)) return null;
        const isHas = (type.always || isCan) && rightCtrl.checkIsHasRights(R, type.id);

        const node = (
          <div
            key={type.id}
            className={'flex flex-gap between margin-gap-v over-hidden ' + className}
          >
            <div>
              <div>{type.title}</div>
              {type.description && (!isDescriptionsCollect || isCan) && (
                <Desc className="color--4 margin-gap-l">
                  {isHas ? type.description[0] : type.description[1] || type.description[0]}
                </Desc>
              )}
            </div>

            <TheIconSendButton
              disabled={isCantEdit || !isCan || type.always || !!isDisabled?.(type, typei)}
              className={(isReverse ? !isHas : isHas) ? 'color--ok' : 'color--3'}
              icon={(isReverse ? !isHas : isHas) ? 'ToggleOn' : 'ToggleOff'}
              onSend={() => onSend(rightCtrl.switchRights(R, type.id))}
            />
          </div>
        );

        if (isCan) isCan = isHas;

        return node;
      })}
    </>
  );
}

const Desc = styled.div`
  font-size: 0.7em;
`;
