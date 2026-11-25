import { translateBase, translateEditorBase } from '#basis/locale';
import { makeToastKOMoodConfig, makeToastOKMoodConfig } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { indexDashTsjrpcClient } from '$index/shared/tsjrpc';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserId } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

// Ключ запроса списка подписок попапа прав: единственный потребитель, поэтому кэш не делится с дашбордом.
// Запрос ленивый (компонент монтируется только при открытии попапа) и всегда свежий благодаря staleTime 0.
const pushTestUsersQueryKey = ['pushTestUsers'];

/**
 * PUSH-проверка одного пользователя: находит его строку в списке подписок
 * и показывает единую кнопку с состоянием устройств и отправкой тестового уведомления.
 * Компонент монтируется только при открытии попапа, поэтому запрос уходит лениво.
 */
export const IndexUserListAccessRightsUserPushCheck = ({ userId }: { userId: UserId }) => {
  const queryClient = useQueryClient();
  const usersQuery = useQuery({
    queryKey: pushTestUsersQueryKey,
    queryFn: () => indexDashTsjrpcClient.getDashPushTestUsers(),
    staleTime: 0,
  });

  // Мутация отправляет тестовый PUSH выбранному пользователю. Сервер возвращает тексты, уже переведённые
  // на язык запрашивающего пользователя: успешный результат показываем в OK-настроении с числом устройств,
  // а при mute — предупреждение в KO-настроении; по завершении обновляем счётчики подписок
  // (сервер мог удалить мёртвые устройства).
  const sendMutation = useMutation({
    mutationFn: (targetUserId: UserId) => indexDashTsjrpcClient.sendTestPushToUser({ userId: targetUserId }),
    onSuccess: result => {
      if (result.mutedMessage) {
        toast(result.mutedMessage, makeToastKOMoodConfig());
      } else {
        toast(result.sentMessage, makeToastOKMoodConfig());
      }

      void queryClient.invalidateQueries({ queryKey: pushTestUsersQueryKey });
    },
    onError: error => {
      // Серверные RPC-ошибки уже приходят локализованными и показываются глобальным слушателем Soki,
      // поэтому здесь тостим только внутренние причины с '#', которые он пропускает, — так тост всегда один.
      const message = '' + error;
      if (!message.startsWith('#')) return;

      toast(message, makeToastKOMoodConfig());
    },
  });

  // Пока список подписок не загружен или пользователь в нём отсутствует, показывать нечего.
  const user = usersQuery.data?.find(user => user.id === userId);
  if (!user) return null;

  const hasSubscriptions = user.subscriptionsCount > 0;
  const isSending = sendMutation.isPending && sendMutation.variables === user.id;

  // Секция повторяет оформление блока PUSH-проверки дашборда, но вся строка — одна кнопка:
  // слева текст «Проверка PUSH-уведомлений» с точкой состояния подписок (её подсказка сохранена),
  // справа напротив текста — колокольчик; клик по строке отправляет тестовое уведомление.
  // Имя пользователя здесь не выводим — оно уже показано в заголовке попапа.
  return (
    <section className="mt-5 ml-3 rounded-xl border border-x2/60 bg-x1/50 p-2">
      <button
        className={twMerge(
          'pointer flex w-full min-w-0 items-center gap-2 rounded-lg px-2 py-2 text-left text-x3 hover:bg-x2/40 disabled:opacity-50',
          !hasSubscriptions && 'opacity-50',
        )}
        disabled={isSending}
        title={translateBase(BaseLocaleKey.PushTestSendTooltip)}
        onClick={() => sendMutation.mutate(user.id)}
      >
        <span
          className={twMerge(
            'size-1.5 shrink-0 rounded-full',
            hasSubscriptions ? (user.isMuted ? 'bg-amber-500/70' : 'bg-chart-2/70') : 'bg-x4/40',
          )}
          // Подсказку точки сервер уже перевёл на язык запрашивающего пользователя:
          // отсутствие подписок, число устройств или «число • mute».
          title={user.subscriptionsTitle}
        />
        <span className="min-w-0 flex-1 truncate">{translateEditorBase(EditorLocaleKey.PushCheck)}</span>
        <LazyIcon
          className="shrink-0"
          icon="Notification01"
        />
      </button>
    </section>
  );
};
