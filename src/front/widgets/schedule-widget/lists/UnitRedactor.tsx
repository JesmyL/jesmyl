import { LazyIcon } from '#shared/ui/icon';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import { SendableField } from '#shared/ui/sendable/SendableField';
import { TheIconSendButton } from '#shared/ui/sendable/TheIconSendButton';
import {
  IScheduleWidgetListCat,
  IScheduleWidgetListUnit,
  IScheduleWidgetUserCati,
  ScheduleUnitScopeProps,
} from 'shared/api';
import { ScheduleWidgetUserList } from '../control/users/UserList';
import { schListsSokiInvocatorClient, schUsersSokiInvocatorClient } from '../invocators/invocators.methods';

type Props = {
  unit: IScheduleWidgetListUnit;
  cat: IScheduleWidgetListCat;
  cati: IScheduleWidgetUserCati;
  shortTitles: [string, string];
  unitScopeData: ScheduleUnitScopeProps;
};

export const ScheduleWidgetListUnitRedactor = ({ unit, cat, cati, shortTitles, unitScopeData }: Props) => {
  const title = <>{unit.title || <span className="text-italic">Без названия</span>}</>;

  return (
    <>
      <ModalHeader>
        <div className="flex flex-gap">
          <LazyIcon icon={cat.icon} />
          {title}
        </div>
      </ModalHeader>
      <ModalBody>
        <SendableField
          icon="Bookmark03"
          title="Название"
          value={unit}
          fieldKey="title"
          isRedact
          onSend={value => schListsSokiInvocatorClient.setUnitTitle(null, unitScopeData, value, cati)}
        />
        <SendableField
          icon="File02"
          title="Описание"
          value={unit}
          fieldKey="dsc"
          multiline
          isRedact
          onSend={value => schListsSokiInvocatorClient.setUnitDescription(null, unitScopeData, value, cati)}
        />
        <ScheduleWidgetUserList
          title="Состав"
          filter={() => true}
          asUserPlusPrefix={(userNode, user, balance) => {
            const isForMember = balance < 3;
            return (
              <div className="flex flex-gap">
                {user.li?.[cati] == null ? (
                  <TheIconSendButton
                    icon="Square"
                    disabled={user.R === undefined}
                    className="nowrap"
                    postfix={
                      user.R === undefined ? (
                        <LazyIcon icon="UserRemove02" />
                      ) : isForMember ? (
                        shortTitles[1]
                      ) : (
                        shortTitles[0]
                      )
                    }
                    onSend={() =>
                      schUsersSokiInvocatorClient.addUserListUnitMembership(
                        null,
                        { ...unitScopeData, userMi: user.mi, cati },
                        isForMember ? unit.mi : -unit.mi,
                      )
                    }
                  />
                ) : (
                  <TheIconSendButton
                    icon="CheckmarkSquare02"
                    postfix={user.li[cati] < 0 ? shortTitles[0] : shortTitles[1]}
                    disabled={user.R === undefined || (user.li[cati] !== unit.mi && user.li[cati] !== -unit.mi)}
                    className={
                      'flex flex-gap nowrap' +
                      (user.li[cati] > 0
                        ? isForMember
                          ? ' color--7'
                          : ' color--ko'
                        : !isForMember
                          ? ' color--7'
                          : ' color--ko')
                    }
                    onSend={() =>
                      schUsersSokiInvocatorClient.removeUserListUnitMembership(null, {
                        ...unitScopeData,
                        userMi: user.mi,
                        cati,
                      })
                    }
                  />
                )}
                {userNode}
              </div>
            );
          }}
        />
      </ModalBody>
    </>
  );
};
