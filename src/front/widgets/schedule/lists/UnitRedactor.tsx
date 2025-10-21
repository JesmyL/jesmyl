import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import {
  IScheduleWidgetListCat,
  IScheduleWidgetListUnit,
  IScheduleWidgetUserCati,
  ScheduleUnitScopeProps,
} from 'shared/api';
import { ScheduleWidgetUserList } from '../control/users/UserList';
import { schListsTsjrpcClient, schUsersTsjrpcClient } from '../tsjrpc/tsjrpc.methods';

type Props = {
  unit: IScheduleWidgetListUnit;
  cat: IScheduleWidgetListCat;
  cati: IScheduleWidgetUserCati;
  shortTitles: [string, string];
  unitScopeData: ScheduleUnitScopeProps;
};

export const ScheduleWidgetListUnitRedactor = ({ unit, cat, cati, shortTitles, unitScopeData }: Props) => {
  const title = <>{unit.title || <span className="italic">Без названия</span>}</>;

  return (
    <>
      <ModalHeader>
        <div className="flex gap-2">
          <LazyIcon icon={cat.icon} />
          {title}
        </div>
      </ModalHeader>
      <ModalBody>
        <StrongEditableField
          icon="Bookmark03"
          title="Название"
          value={unit}
          fieldKey="title"
          isRedact
          onSend={value => schListsTsjrpcClient.setUnitTitle({ props: unitScopeData, value, cati })}
        />
        <StrongEditableField
          icon="File02"
          title="Описание"
          value={unit}
          fieldKey="dsc"
          multiline
          isRedact
          onSend={value => schListsTsjrpcClient.setUnitDescription({ props: unitScopeData, value, cati })}
        />
        <ScheduleWidgetUserList
          title="Состав"
          filter={() => true}
          asUserPlusPrefix={(userNode, user, balance) => {
            const isForMember = balance < 3;
            return (
              <div className="flex gap-2">
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
                      schUsersTsjrpcClient.addUserListUnitMembership({
                        props: { ...unitScopeData, userMi: user.mi, cati },
                        value: isForMember ? unit.mi : -unit.mi,
                      })
                    }
                  />
                ) : (
                  <TheIconSendButton
                    icon="CheckmarkSquare02"
                    postfix={user.li[cati] < 0 ? shortTitles[0] : shortTitles[1]}
                    disabled={user.R === undefined || (user.li[cati] !== unit.mi && user.li[cati] !== -unit.mi)}
                    className={
                      'flex gap-2 nowrap' +
                      (user.li[cati] > 0
                        ? isForMember
                          ? ' text-x7'
                          : ' text-xKO'
                        : !isForMember
                          ? ' text-x7'
                          : ' text-xKO')
                    }
                    onSend={() =>
                      schUsersTsjrpcClient.removeUserListUnitMembership({
                        props: {
                          ...unitScopeData,
                          userMi: user.mi,
                          cati,
                        },
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
