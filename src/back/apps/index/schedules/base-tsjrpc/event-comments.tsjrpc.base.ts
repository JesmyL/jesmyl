import { backLocaleError } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { eventCommentsDB } from 'back/drizzle.schema';
import { db, dbDelete } from 'back/drizzle/drizzle.db';
import { ServerTSJRPCTool, TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { and, asc, eq } from 'drizzle-orm';
import {
  ScheduleWidgetDayEventMi,
  ScheduleWidgetRegType,
  scheduleWidgetRegTypeRights,
  ScheduleWidgetWid,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import { SchEventCommentsTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { takeUserTiny } from '../../tinies/userTiny';
import { takeScheduleWidgetTiny } from '../schedule.tiny';

const takeEventCommentAuthor = async (
  schw: ScheduleWidgetWid,
  eventMi: ScheduleWidgetDayEventMi,
  tool: ServerTSJRPCTool,
) => {
  const auth = takeLogginedAuthOrThrow(tool.auth);
  const [authUser, sch] = await Promise.all([
    takeUserTiny({ l: auth.login }, false),
    takeScheduleWidgetTiny({ w: schw }),
  ]);

  if (!authUser) throw backLocaleError(BackLocaleKey.UserNotFound);

  const event = sch.days.flatMap(day => day.list).find(event => event.mi === eventMi);
  if (event == null) throw backLocaleError(BackLocaleKey.EventNotFound);

  const schUser = sch.ctrl.users.find(user => user.id === authUser.id);
  const isSwPublic = scheduleWidgetRegTypeRights.checkIsHasRights(sch.ctrl.type, ScheduleWidgetRegType.Public);

  if (!isSwPublic && schUser == null) throw backLocaleError(BackLocaleKey.ScheduleAccessDenied);

  const userRights = schUser?.R ?? sch.ctrl.defu;

  if (!scheduleWidgetUserRights.checkIsHasRights(userRights, ScheduleWidgetUserRoleRight.Read))
    throw backLocaleError(BackLocaleKey.EventCommentForbidden);

  if (event.secret && !scheduleWidgetUserRights.checkIsHasRights(userRights, ScheduleWidgetUserRoleRight.ReadSpecials))
    throw backLocaleError(BackLocaleKey.SecretEventCommentForbidden);

  return { userId: authUser.id, userRights };
};

export const schEventCommentsTsjrpcBaseServer =
  new (class SchEventComments extends TsjrpcBaseServer<SchEventCommentsTsjrpcMethods> {
    constructor() {
      super({
        scope: 'SchEventComments',
        methods: {
          setEventComment: async ({ schw, eventMi, text }, tool) => {
            const commentText = text.trim();
            if (!commentText) throw backLocaleError(BackLocaleKey.CommentEmpty);

            const { userId } = await takeEventCommentAuthor(schw, eventMi, tool);

            await db
              .insert(eventCommentsDB)
              .values({ schw, eventMi, userId, text: commentText })
              .onConflictDoUpdate({
                target: [eventCommentsDB.schw, eventCommentsDB.eventMi, eventCommentsDB.userId],
                set: { text: commentText },
              });
          },

          dropEventComment: async ({ schw, eventMi }, tool) => {
            const { userId } = await takeEventCommentAuthor(schw, eventMi, tool);
            const where = and(
              eq(eventCommentsDB.schw, schw),
              eq(eventCommentsDB.eventMi, eventMi),
              eq(eventCommentsDB.userId, userId),
            );

            if (where == null) throw backLocaleError(BackLocaleKey.CommentDetectFailed);

            await dbDelete(eventCommentsDB, where);
          },

          takeEventComments: async ({ schw, eventMi }, tool) => {
            const { userId, userRights } = await takeEventCommentAuthor(schw, eventMi, tool);
            const isCanReadAll = scheduleWidgetUserRights.checkIsHasRights(
              userRights,
              ScheduleWidgetUserRoleRight.TotalRedact,
            );

            const comments = await db
              .select({
                userId: eventCommentsDB.userId,
                text: eventCommentsDB.text,
                createdAt: eventCommentsDB.createdAt,
              })
              .from(eventCommentsDB)
              .where(
                isCanReadAll
                  ? and(eq(eventCommentsDB.schw, schw), eq(eventCommentsDB.eventMi, eventMi))
                  : and(
                      eq(eventCommentsDB.schw, schw),
                      eq(eventCommentsDB.eventMi, eventMi),
                      eq(eventCommentsDB.userId, userId),
                    ),
              )
              .orderBy(asc(eventCommentsDB.createdAt));

            return { value: comments };
          },
        },
      });
    }
  })();
