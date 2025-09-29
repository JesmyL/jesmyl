import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { MyLib } from '#shared/lib/my-lib';
import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { ReactNode } from 'react';
import { IScheduleWidgetDayEvent, ScheduleDayEventScopeProps } from 'shared/api';
import { emptyAsyncFunc, itNNull } from 'shared/utils';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';

const ratePoints = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5] as const;
const defRate: [number, string] = [0, ''];

export function ScheduleWidgetDayEventRating(props: {
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
                className="flex gap-2"
              >
                <div
                  className={twMerge(
                    'mt-2 nowrap self-start font-bold',
                    rate[0] < 0 ? 'text-xKO' : rate[0] > 0 ? 'text-xOK' : 'text-x3',
                  )}
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
          <div className="text-x3">{otherRatesTitleNode}</div>
          {isOtherRatesTitleExpand &&
            (usersRateNode?.length ? usersRateNode : <span className="text-x7 italic ml-2">Оценок нет</span>)}
        </>
      );
    }
  }

  return (
    <>
      <div className="text-x3 my-2">{titleNode}</div>
      {isExpand && (
        <div className="ml-5 my-2">
          <div className="flex my-2">
            {ratePoints.map(ratePoint => {
              const isFill =
                ratePoint === 0 ? myRate[0] === 0 : ratePoint < 0 ? myRate[0] <= ratePoint : myRate[0] >= ratePoint;

              return (
                <TheIconSendButton
                  key={ratePoint}
                  className={
                    (ratePoint < 0 ? 'text-xKO' : ratePoint > 0 ? 'text-xOK' : 'text-x3') +
                    (isFill ? '' : ' opacity-50')
                  }
                  icon={ratePoint < 0 ? 'Heartbreak' : ratePoint === 0 ? 'HelpCircle' : 'Favourite'}
                  onSend={async () =>
                    ratePoint !== myRate[0] &&
                    schDayEventsTsjrpcClient.setRatePoint({
                      props: props.dayEventScopeProps,
                      userMi: myUser.mi,
                      ratePoint: ratePoint,
                      userName: myUser.fio ?? myUser.nick ?? '??',
                    })
                  }
                />
              );
            })}
            <StyledReitingDisplay
              className={'ml-2' + (myRate[0] === 0 ? ' text-x3' : myRate[0] < 0 ? ' text-xKO' : ' text-xOK')}
            >
              {myRate[0]}
            </StyledReitingDisplay>
          </div>
          <StrongEditableField
            icon="Message01"
            value={myRate[1]}
            title="Комментарий"
            className="my-2"
            isRedact
            isSelfRedact
            multiline
            onSend={value =>
              schDayEventsTsjrpcClient.setRateComment({
                props: props.dayEventScopeProps,
                userMi: myUser.mi,
                comment: value,
                userName: myUser.fio ?? myUser.nick ?? '??',
              })
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
