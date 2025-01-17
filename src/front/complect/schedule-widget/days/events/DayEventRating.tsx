import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { MyLib } from 'front/utils';
import { ReactNode, useMemo } from 'react';
import { IScheduleWidgetDayEvent, ScheduleDayEventScopeProps } from 'shared/api';
import { emptyAsyncFunc, itNNull } from 'shared/utils';
import styled from 'styled-components';
import { IconFavouriteStrokeRounded } from '../../../../complect/the-icon/icons/favourite';
import { IconHeartbreakStrokeRounded } from '../../../../complect/the-icon/icons/heartbreak';
import { IconHelpCircleStrokeRounded } from '../../../../complect/the-icon/icons/help-circle';
import { IconMessage01StrokeRounded } from '../../../../complect/the-icon/icons/message-01';
import useIsExpand from '../../../expand/useIsExpand';
import StrongEditableField from '../../../strong-control/field/StrongEditableField';
import { schSokiInvocatorClient } from '../../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../../useScheduleWidget';

const ratePoints = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const defRate: [number, string] = [0, ''];

export default function ScheduleWidgetDayEventRating(props: {
  event: IScheduleWidgetDayEvent;
  dayEventScopeProps: ScheduleDayEventScopeProps;
}) {
  const rights = useScheduleWidgetRightsContext();

  const ratingSum =
    props.event.rate === undefined ? 0 : MyLib.values(props.event.rate).reduce((sum, [rate]) => sum + rate, 0);

  const [titleNode, isExpand] = useIsExpand(
    false,
    <>
      <IconFavouriteStrokeRounded />
      Рейтинг события
      <StyledReitingDisplay>{ratingSum}</StyledReitingDisplay>
    </>,
  );
  const [otherRatesTitleNode, isOtherRatesTitleExpand] = useIsExpand(false, <>Другие оценки</>);

  const rateScopeProps = useMemo(
    () => ({ ...props.dayEventScopeProps, userMi: rights.myUser?.mi ?? -1 }),
    [props.dayEventScopeProps, rights.myUser?.mi],
  );

  let myRate = defRate;
  let rateScope = '';
  let ratingNode = null;

  if (isExpand) {
    myRate = (rights.myUser && props.event.rate?.[rights.myUser?.mi]) ?? defRate;
    // if (rights.myUser) rateScope = takeStrongScopeMaker(props.scope, ' userMi/', rights.myUser.mi);

    if (rights.isCanTotalRedact && rights.myUser) {
      let usersRateNode: ReactNode[] | null = null;
      const myUser = rights.myUser;
      const rates = props.event.rate;

      if (isOtherRatesTitleExpand && rates) {
        usersRateNode = rights.schedule.ctrl.users
          .map(user => {
            if (myUser.mi === user.mi) return null;
            const rate = rates[user.mi];
            if (rate === undefined) return null;

            return (
              <div
                key={user.mi}
                className="flex flex-gap"
              >
                <div
                  className={
                    'margin-gap-t nowrap self-start text-bold' +
                    (rate[0] < 0 ? ' color--ko' : rate[0] > 0 ? ' color--ok' : ' color--3')
                  }
                >
                  {user.fio || user.nick}: {rate[0]}
                </div>
                {rate[1] && (
                  <StrongEditableField
                    value={rate[1]}
                    multiline
                    onSend={emptyAsyncFunc}
                  />
                )}
              </div>
            );
          })
          .filter(itNNull);
      }

      ratingNode = (
        <>
          <div className="color--3">{otherRatesTitleNode}</div>
          {isOtherRatesTitleExpand &&
            (usersRateNode?.length ? (
              usersRateNode
            ) : (
              <span className="color--7 text-italic margin-gap-l">Оценок нет</span>
            ))}
        </>
      );
    }
  }

  return (
    <>
      <div className="color--3 margin-gap-v">{titleNode}</div>
      {isExpand && (
        <div className="margin-big-gap-l margin-gap-v">
          <div className="flex margin-gap-v">
            {ratePoints.map(ratePoint => {
              const isFill =
                ratePoint === 0 ? myRate[0] === 0 : ratePoint < 0 ? myRate[0] <= ratePoint : myRate[0] >= ratePoint;

              return (
                <EvaSendButton
                  key={ratePoint}
                  // scope={rateScope}
                  // fieldName="rate"
                  // isCanSend={ratePoint !== myRate[0]}
                  // fieldValue={ratePoint}
                  // cud="U"
                  className={
                    (ratePoint < 0 ? 'color--ko' : ratePoint > 0 ? 'color--ok' : 'color--3') +
                    (isFill ? '' : ' fade-05')
                  }
                  Icon={
                    ratePoint < 0
                      ? IconHeartbreakStrokeRounded
                      : ratePoint === 0
                        ? IconHelpCircleStrokeRounded
                        : IconFavouriteStrokeRounded
                  }
                  onSend={() => schSokiInvocatorClient.oooooooooooooooooooooooooooooooooooooo(null)}
                />
              );
            })}
            <StyledReitingDisplay
              className={'margin-gap-l' + (myRate[0] === 0 ? ' color--3' : myRate[0] < 0 ? ' color--ko' : ' color--ok')}
            >
              {myRate[0]}
            </StyledReitingDisplay>
          </div>
          <StrongEditableField
            Icon={IconMessage01StrokeRounded}
            value={myRate[1]}
            title="Комментарий"
            className="margin-gap-v"
            isRedact
            setSelfRedact
            multiline
            // onSend={value => schSokiInvocatorClient.setEventRatingComment(null, rateScopeProps, value)}
            onSend={value => schSokiInvocatorClient.oooooooooooooooooooooooooooooooooooooo(null, rateScopeProps, value)}
          />
          {ratingNode}
        </div>
      )}
    </>
  );
}

const StyledReitingDisplay = styled.span`
  width: 1.5em;
  text-align: center;
`;
