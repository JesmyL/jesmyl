import { useAtom } from 'front/complect/atoms';
import { useCallback } from 'react';
import { SecretChat } from 'shared/api';
import { ActualRef, useActualRef } from '../../../../../../../complect/useActualRef';
import { ListSlicerLimits } from '../../../../../../../complect/useListInfiniteScrollController';
import { secretChatClassNamesDict, useSecretChatIdContext } from '../../complect';
import { secretChatsIsAlternativeMessageHashMapAtom, useChatAlternativeMessagesHashMapValue } from '../../molecule';

let markAsAccentClickTimeoutDict: Partial<Record<SecretChat.MessageId, TimeOut>> = {};

export const useScrollIntoViewAccentMessageCallback = (
  messageIdsRef: ActualRef<`${SecretChat.MessageId}`[]>,
  limits: ListSlicerLimits,
  setLimits: (start: number | nil, finish: number | nil) => void,
  loadMessagesNearId: (
    messageId: SecretChat.MessageId,
    scrollToMessage: (messageId?: SecretChat.MessageId) => void,
  ) => void,
) => {
  const loadMessagesNearIdRef = useActualRef(loadMessagesNearId);
  const chatId = useSecretChatIdContext();
  const alternativeMessagesHashMap = useChatAlternativeMessagesHashMapValue(chatId);
  const [isAlternativeList, setIsAlternativeList] = useAtom(secretChatsIsAlternativeMessageHashMapAtom);

  return useCallback(
    (messageId: SecretChat.MessageId) => {
      const findNode = () => document.querySelector(`[message-id='${messageId}']`);
      let targetMessageNode = findNode();
      const targetMessageIdi = messageIdsRef.current.indexOf(`${messageId}`);

      const makeAccent = (id = messageId) => {
        targetMessageNode ??= findNode();
        if (targetMessageNode === null) return;

        targetMessageNode.scrollIntoView({ block: 'center' });

        targetMessageNode.classList.add(secretChatClassNamesDict.markAsAccent);

        clearTimeout(markAsAccentClickTimeoutDict[messageId]);

        if (targetMessageNode.classList.contains(secretChatClassNamesDict.markAsAccent)) {
          targetMessageNode?.classList.remove(secretChatClassNamesDict.markAsAccent);
          setTimeout(() => {
            targetMessageNode?.classList.add(secretChatClassNamesDict.markAsAccent);
          }, 50);
        }
      };

      if (targetMessageNode === null) {
        if (targetMessageIdi < 0) {
          if (alternativeMessagesHashMap?.[messageId]) {
            if (isAlternativeList[chatId]) loadMessagesNearIdRef.current(messageId, makeAccent);
            else {
              setIsAlternativeList(prev => ({ ...prev, [chatId]: true }));
              setTimeout(makeAccent, 500);
            }
          } else loadMessagesNearIdRef.current(messageId, makeAccent);
          return;
        }

        setLimits(targetMessageIdi - 20, targetMessageIdi + 20);
        setTimeout(makeAccent, 500);

        return;
      }

      const startLimit = targetMessageIdi - limits.start < 30 ? targetMessageIdi - 30 : null;
      const finishLimit = limits.finish - targetMessageIdi < 30 ? targetMessageIdi + 30 : null;

      setLimits(startLimit, finishLimit);

      setTimeout(makeAccent, 100);
    },
    [
      alternativeMessagesHashMap,
      chatId,
      isAlternativeList,
      limits.finish,
      limits.start,
      loadMessagesNearIdRef,
      messageIdsRef,
      setIsAlternativeList,
      setLimits,
    ],
  );
};
