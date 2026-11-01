import { translateBase } from '#basis/locale';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Atom, atom } from 'atomaric';
import { ReactNode } from 'react';
import { ScheduleWidgetAttKey, scheduleWidgetUserRights } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { useScheduleWidgetRightsContext } from '../contexts';
import { ScheduleWidgetAppAtt } from '../ScheduleWidget.model';
import { ScheduleWidgetCustomAtt } from './custom/CustomAtt';

type Props = {
  isRedact?: boolean;
  isCanRedactOverride?: boolean;
  tatt?: ScheduleWidgetAppAtt;
  attKey: ScheduleWidgetAttKey;
  typeTitle: ReactNode;
  customAttTopContent?: (attKey: ScheduleWidgetAttKey) => ReactNode;
  isLink?: boolean;
  onRemoveAttSend: (attKey: ScheduleWidgetAttKey) => Promise<unknown>;
};

let tattOnRedactAtom: Atom<ScheduleWidgetAttKey | null>;

export function ScheduleWidgetAttFace({
  tatt,
  typeTitle,
  attKey,
  isRedact,
  isCanRedactOverride,
  isLink,
  customAttTopContent,
  onRemoveAttSend,
}: Props) {
  tattOnRedactAtom ??= atom<ScheduleWidgetAttKey | null>(null);

  const rights = useScheduleWidgetRightsContext();
  const myUserR = rights.myUser?.R ?? rights.schedule.ctrl.defu;

  if (!scheduleWidgetUserRights.checkIsCan(myUserR, tatt?.R)) return null;

  const isCanRedact = isCanRedactOverride ?? scheduleWidgetUserRights.checkIsCan(myUserR, tatt?.U);

  return (
    <>
      <div
        className={
          'relative flex center column strong-size bg-x5 rounded-[3px] [--strong-size:90px]' +
          (isCanRedact && tatt?.isCustomize ? ' text-x7 pointer' : '')
        }
        onClick={isCanRedact && tatt?.isCustomize ? () => tattOnRedactAtom.set(attKey) : undefined}
      >
        {isLink && (
          <LazyIcon
            icon="Link02"
            className="absolute left-0 top-0 text-x3 opacity-50"
          />
        )}
        {isRedact && isCanRedact && (
          <TheIconSendButton
            icon="Cancel01"
            className="absolute right-0 top-0"
            confirm={
              <>
                {isLink
                  ? translateBase(BaseLocaleKey.ScheduleRemoveAttachmentReference, { t: tatt?.title || '??' })
                  : translateBase(BaseLocaleKey.ScheduleRemoveAttachment, { t: tatt?.title || '??' })}
                {typeTitle}?
              </>
            }
            onSend={() => onRemoveAttSend(attKey)}
          />
        )}
        {tatt ? (
          <>
            <LazyIcon icon={tatt.icon} />
            <div className="ellipsis max-w-full">{tatt.title}</div>
          </>
        ) : (
          <>
            <LazyIcon
              icon="HelpCircle"
              className="text-xKO"
            />
            <div className="text-xKO">{translateBase(BaseLocaleKey.ScheduleUnknownShort)}</div>
          </>
        )}
      </div>
      {!tatt || (
        <Modal
          openAtom={tattOnRedactAtom}
          checkIsOpen={tatt => tatt === attKey}
        >
          <ModalHeader>
            {translateBase(BaseLocaleKey.ScheduleAttachment)} <span className="text-x7">{tatt.title}</span>
          </ModalHeader>
          <ModalBody>
            <ScheduleWidgetCustomAtt
              tatt={tatt as never}
              isRedact
              topContent={customAttTopContent?.(attKey)}
            />
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
