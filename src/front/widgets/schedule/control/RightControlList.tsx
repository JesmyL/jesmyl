import { translateBase } from '#basis/locale';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { ScheduleWidgetRightsCtrl, ScheduleWidgetRightTexts } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export function ScheduleWidgetRightControlList({
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
  let isIndividualStarted = false;

  return (
    <>
      {isDescriptionsCollect && (
        <div className="text-x7 my-2  ml-2">{translateBase(BaseLocaleKey.ScheduleSmallFontStatements)}</div>
      )}
      {rightCtrl.texts.map((type, typei) => {
        if (type.hidden || isHidden?.(type, typei)) return null;
        const isIndividualStart = type.individual && !isIndividualStarted;
        if (type.individual) isIndividualStarted = true;
        const isHas =
          (type.always || type.individual || isCan) &&
          (type.individual
            ? rightCtrl.checkIsHasIndividualRights(R, type.id)
            : rightCtrl.checkIsHasRights(R, type.id));

        const node = (
          <div
            key={type.id}
            className={
              'flex gap-2 between my-2 over-hidden ' +
              (isIndividualStart ? 'mt-4 pt-2 border-t border-x3 ' : '') +
              className
            }
          >
            <div>
              <div>{type.title}</div>
              {type.description && (!isDescriptionsCollect || isCan) && (
                <div className="text-x4 ml-2 text-[0.7em]">
                  {isHas ? type.description[0] : type.description[1] || type.description[0]}
                </div>
              )}
            </div>

            <TheIconSendButton
              disabled={isCantEdit || (!type.individual && !isCan) || type.always || !!isDisabled?.(type, typei)}
              className={(isReverse ? !isHas : isHas) ? 'text-xOK' : 'text-x3'}
              icon={(isReverse ? !isHas : isHas) ? 'ToggleOn' : 'ToggleOff'}
              onSend={() => onSend(rightCtrl.switchRights(R, type.id))}
            />
          </div>
        );

        if (isCan && !type.individual) isCan = isHas;

        return node;
      })}
    </>
  );
}
