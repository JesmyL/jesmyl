import { translateBase } from '#basis/locale';
import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { takeScheduleWidgetUserName } from '#widgets/schedule/useScheduleWidget';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { ReactNode } from 'react';
import { IScheduleWidgetDayEvent, ScheduleDayEventScopeProps } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { emptyAsyncFunc, itNNull } from 'shared/utils';
import { objectValues } from 'shared/utils/object.utils';
import { twMerge } from 'tailwind-merge';
import { ScheduleWidgetEventComments } from './DayEventComments';

const ratePoints = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5] as const;
const defRate: [number, string] = [0, ''];

export function ScheduleWidgetDayEventRating(props: {
  event: IScheduleWidgetDayEvent;
  dayEventScopeProps: ScheduleDayEventScopeProps;
}) {
  const rights = useScheduleWidgetRightsContext();

  const ratingSum =
    props.event.rate === undefined ? 0 : objectValues(props.event.rate).reduce((sum, [rate]) => sum + rate, 0);

  const [titleNode, isExpand] = useIsExpand(
    false,
    <>
      <LazyIcon icon="Favourite" />
      {translateBase(BaseLocaleKey.ScheduleEventRating)}
      <span className="w-6 text-center">{ratingSum}</span>
    </>,
  );
  const [otherRatesTitleNode, isOtherRatesTitleExpand] = useIsExpand(
    false,
    <>{translateBase(BaseLocaleKey.ScheduleOtherRatings)}</>,
  );

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
                  {takeScheduleWidgetUserName(rights, user)}: {rate[0]}
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
            (usersRateNode?.length ? (
              usersRateNode
            ) : (
              <span className="text-x7 italic ml-2">{translateBase(BaseLocaleKey.ScheduleNoRatings)}</span>
            ))}
        </>
      );
    }
  }

  return (
    <>
      <div className="text-x3 my-2">{titleNode}</div>
      {isExpand && (
        <div className="ml-5 my-2">
          <div className="flex gap-0 my-2">
            {ratePoints.map(ratePoint => {
              const isSelected = ratePoint === myRate[0];
              const isFill = ratePoint === 0 ? isSelected : ratePoint < 0 ? myRate[0] <= ratePoint : myRate[0] >= ratePoint;

              return (
                <TheIconSendButton
                  key={ratePoint}
                  className={twMerge(
                    'flex-max gap-0.5 transition-transform duration-150',
                    ratePoint < 0 ? 'text-xKO' : ratePoint > 0 ? 'text-xOK' : 'text-x3',
                    isSelected ? 'scale-125' : isFill ? 'opacity-100' : 'opacity-40',
                  )}
                  iconClassName="p-0! size-5! border-0! bg-transparent! shadow-none!"
                  icon={ratePoint < 0 ? 'Heartbreak' : ratePoint === 0 ? 'HelpCircle' : 'Favourite'}
                  onSend={async () =>
                    ratePoint !== myRate[0] &&
                    schDayEventsTsjrpcClient.setRatePoint({
                      props: props.dayEventScopeProps,
                      userMi: myUser.mi,
                      ratePoint: ratePoint,
                      userName: takeScheduleWidgetUserName(rights, myUser) || '??',
                    })
                  }
                />
              );
            })}
            <span
              className={twMerge(
                'w-8 text-center font-bold ml-2',
                myRate[0] === 0 ? 'text-x3' : myRate[0] < 0 ? 'text-xKO' : 'text-xOK',
              )}
            >
              {myRate[0]}
            </span>
          </div>

          <ScheduleWidgetEventComments
            schw={rights.schedule.w}
            eventMi={props.event.mi}
          />

          {ratingNode}
        </div>
      )}
    </>
  );
}
