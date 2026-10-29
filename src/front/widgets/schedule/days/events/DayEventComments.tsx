import { translateBase } from '#basis/locale';
import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { takeScheduleWidgetUserName } from '#widgets/schedule/useScheduleWidget';
import { schEventCommentsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { useCallback, useEffect, useState } from 'react';
import { ScheduleWidgetDayEventMi, ScheduleWidgetWid, UserId } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { emptyFunc } from 'shared/utils';

type EventComment = {
  userId: UserId;
  text: string;
  createdAt: number;
};

export function ScheduleWidgetEventComments({
  schw,
  eventMi,
}: {
  schw: ScheduleWidgetWid;
  eventMi: ScheduleWidgetDayEventMi;
}) {
  const rights = useScheduleWidgetRightsContext();
  const [comments, setComments] = useState<EventComment[]>([]);

  const reloadComments = useCallback(
    () =>
      schEventCommentsTsjrpcClient
        .takeEventComments({ schw, eventMi })
        .then(list => setComments(list ?? []))
        .catch(emptyFunc),
    [eventMi, schw],
  );

  useEffect(() => {
    void reloadComments();
  }, [reloadComments]);

  const myUser = rights.myUser;

  if (myUser == null) return null;

  const myComment = comments.find(comment => comment.userId === myUser.id);
  const otherComments = rights.isCanTotalRedact ? comments.filter(comment => comment.userId !== myUser.id) : [];

  return (
    <div className="my-3">
      <div className="flex items-center gap-2 my-2 text-x3">
        <LazyIcon icon="Message01" />
        {translateBase(BaseLocaleKey.Comment)}
      </div>

      <StrongEditableField
        icon="Message01"
        value={myComment?.text}
        placeholder={translateBase(BaseLocaleKey.Comment)}
        className="my-2"
        isSelfRedact
        multiline
        onSend={async value => {
          const text = value.trim();

          if (text) await schEventCommentsTsjrpcClient.setEventComment({ schw, eventMi, text });
          else await schEventCommentsTsjrpcClient.dropEventComment({ schw, eventMi });

          await reloadComments();
        }}
      />

      {otherComments.map(comment => {
        const user = rights.schedule.ctrl.users.find(user => user.id === comment.userId);

        return (
          <div
            key={comment.userId}
            className="my-2 rounded-lg border border-x4/40 bg-x1/40 px-3 py-2"
          >
            <div className="text-xs font-bold text-x7">
              {user ? takeScheduleWidgetUserName(rights, user) : '?'}
            </div>
            <div className="whitespace-pre-wrap break-word">{comment.text}</div>
          </div>
        );
      })}
    </div>
  );
}
