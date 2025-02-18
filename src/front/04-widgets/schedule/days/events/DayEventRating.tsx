import { schDayEventsSokiInvocatorClient } from '#basis/lib/invocators/schedules/invocators.methods';
import StrongEditableField from '#widgets/schedule/strong-control/field/StrongEditableField';
import useIsExpand from 'front/08-shared/ui/expand/useIsExpand';
import TheIconSendButton from 'front/08-shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from 'front/08-shared/ui/the-icon/LazyIcon';
import { MyLib } from 'front/utils';
import { ReactNode } from 'react';
import { IScheduleWidgetDayEvent, ScheduleDayEventScopeProps } from 'shared/api';
import { emptyAsyncFunc, itNNull } from 'shared/utils';
import styled from 'styled-components';
import { useScheduleWidgetRightsContext } from '../../useScheduleWidget';

const ratePoints = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5] as const;
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
      <LazyIcon icon="Favourite" />
      Рейтинг события
      <StyledReitingDisplay>{ratingSum}</StyledReitingDisplay>
    </>,
  );
  const [otherRatesTitleNode, isOtherRatesTitleExpand] = useIsExpand(false, <>Другие оценки</>);

  const myUser = rights.myUser;

  if (myUser == null) return;

  let myRate = defRate;
  let ratingNode = null;

  if (isExpand) {
    myRate = props.event.rate?.[myUser.mi] ?? defRate;

    if (rights.isCanTotalRedact) {
      let usersRateNode: ReactNode[] | null = null;
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
                <TheIconSendButton
                  key={ratePoint}
                  className={
                    (ratePoint < 0 ? 'color--ko' : ratePoint > 0 ? 'color--ok' : 'color--3') +
                    (isFill ? '' : ' fade-05')
                  }
                  icon={ratePoint < 0 ? 'Heartbreak' : ratePoint === 0 ? 'HelpCircle' : 'Favourite'}
                  onSend={async () =>
                    ratePoint !== myRate[0] &&
                    schDayEventsSokiInvocatorClient.setRatePoint(
                      null,
                      props.dayEventScopeProps,
                      myUser.mi,
                      ratePoint,
                      myUser.fio ?? myUser.nick ?? '??',
                    )
                  }
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
            icon="Message01"
            value={myRate[1]}
            title="Комментарий"
            className="margin-gap-v"
            isRedact
            setSelfRedact
            multiline
            onSend={value =>
              schDayEventsSokiInvocatorClient.setRateComment(
                null,
                props.dayEventScopeProps,
                myUser.mi,
                value,
                myUser.fio ?? myUser.nick ?? '??',
              )
            }
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
