import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import {
  IScheduleWidgetListCat,
  IScheduleWidgetListUnit,
  IScheduleWidgetUserCati,
  ScheduleUnitScopeProps,
} from 'shared/api';
import { ModalBody } from '../../modal/Modal/ModalBody';
import { ModalHeader } from '../../modal/Modal/ModalHeader';
import StrongEditableField from '../../strong-control/field/StrongEditableField';
import { LazyIcon } from '../../the-icon/LazyIcon';
import { IconBookmark03StrokeRounded } from '../../the-icon/icons/bookmark-03';
import { IconCheckmarkSquare02StrokeRounded } from '../../the-icon/icons/checkmark-square-02';
import { IconFile02StrokeRounded } from '../../the-icon/icons/file-02';
import { IconSquareStrokeRounded } from '../../the-icon/icons/square';
import { IconUserRemove02StrokeRounded } from '../../the-icon/icons/user-remove-02';
import ScheduleWidgetUserList from '../control/users/UserList';
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
          <LazyIcon name={cat.icon} />
          {title}
        </div>
      </ModalHeader>
      <ModalBody>
        <StrongEditableField
          Icon={IconBookmark03StrokeRounded}
          title="Название"
          value={unit}
          fieldKey="title"
          isRedact
          onSend={value => schListsSokiInvocatorClient.setUnitTitle(null, unitScopeData, value, cati)}
        />
        <StrongEditableField
          Icon={IconFile02StrokeRounded}
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
                  <EvaSendButton
                    Icon={IconSquareStrokeRounded}
                    disabled={user.R === undefined}
                    className="nowrap"
                    postfix={
                      user.R === undefined ? (
                        <IconUserRemove02StrokeRounded />
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
                  <EvaSendButton
                    Icon={IconCheckmarkSquare02StrokeRounded}
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
