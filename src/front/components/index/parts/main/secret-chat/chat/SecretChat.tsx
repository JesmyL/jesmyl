import { soki } from 'front/soki';
import { MyLib } from 'front/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { SecretChat } from 'shared/api';
import { useAtomValue } from '../../../../../../complect/atoms';
import PhaseContainerConfigurer from '../../../../../../complect/phase-container/PhaseContainerConfigurer';
import { useActualRef } from '../../../../../../complect/useActualRef';
import { useListInfiniteScrollController } from '../../../../../../complect/useListInfiniteScrollController';
import {
  SecretChatContext,
  SecretChatIdContext,
  SecretChatMessagesHashContext,
  SecretChatMessagesTssContext,
  secretChatMessageTsAsOpenContextAtom,
  SecretChatUnreachedMessagesMessagesHashContext,
  useSecretChatContext,
  useSecretChatLastReadTsContext,
  useSecretChatMessagesHashContext,
  useSecretChatMessagesTssContext,
} from '../complect';
import {
  secretChatFacesAtom,
  secretChatsIsAlternativeMessageHashMapAtom,
  useChatAlternativeMessagesHashMapValue,
  useChatMessagesHashMapValue,
  useChatUnreachedMessagesHashMapValue,
} from '../molecule';
import { CssSecretChatMessage } from './complect/_CssSecretChatMessage';
import { SecretChatHead } from './complect/ChatHead';
import { ChatManagePage } from './complect/ChatManagePage';
import { MessageContextMenu } from './complect/MessageContextMenu';
import { useChatListInteractiveListener } from './complect/useChatListInteractiveListener';
import { useLastReadTsController } from './complect/useLastReadTsController';
import { useScrollIntoViewAccentMessageCallback } from './complect/useScrollIntoViewAccentMessageCallback';
import { SecretChatMessage } from './message/Message';
import {
  StyledMessageInputPanel,
  StyledMessagesList,
  StyledReplyFloatIconBox,
  StyledSecretChat,
  StyledSecretChatReplyIcon,
} from './SecretChat.styled';

const PageChatInContexts = () => {
  const chat = useSecretChatContext();
  const chatLastReadTs = useSecretChatLastReadTsContext();
  const messagesHash = useSecretChatMessagesHashContext();
  const listRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const replyFloatIconBoxRef = useRef<HTMLDivElement>(null);
  const [initialLastReadTs, setInitialLastReadTs] = useState(chatLastReadTs);
  const messageTssRef = useActualRef(useSecretChatMessagesTssContext());
  const contextOfMessageTs = useAtomValue(secretChatMessageTsAsOpenContextAtom);
  // const fetchedMessageIdsSet = useMemo(() => new Set<SecretChat.MessageId>(), []);

  useEffect(() => {
    soki.send({ chatFetch: { chatId: chat.chatId, pullMessages: true } }, 'index');
  }, [chat.chatId]);

  useLastReadTsController(
    chatRef,
    listRef,
    replyFloatIconBoxRef,
    chat,
    messageTssRef,
    initialLastReadTs,
    setInitialLastReadTs,
  );

  const { limits, updateLimits } = useListInfiniteScrollController(
    listRef,
    messageTssRef.current,
    messageTs => messageTs === chatLastReadTs,
    // isMessageStart => {
    //   const messageId = isMessageStart
    //     ? Math.max(...(messageTssRef.current as never as []))
    //     : Math.min(...(messageTssRef.current as never as []));

    //   if (fetchedMessageIdsSet.has(messageId)) return;
    //   fetchedMessageIdsSet.add(messageId);

    //   soki.send(
    //     {
    //       chatFetch: {
    //         chatId: chat.chatId,
    //         pullMessages: {
    //           isMessageStart,
    //           messageId,
    //           fetchCount: 30,
    //         },
    //       },
    //     },
    //     'index',
    //   );
    // },
  );

  const scrollToAccentMessage = useScrollIntoViewAccentMessageCallback(
    messageTssRef,
    limits,
    updateLimits,
    messageId => {
      soki
        .send(
          {
            chatFetch: {
              chatId: chat.chatId,
              pullAlternativeMessagesNearId: messageId,
            },
          },
          'index',
        )
        .on(() => {});
    },
  );

  useChatListInteractiveListener(listRef, scrollToAccentMessage, messagesHash);

  if (1) return null;

  return (
    <Routes>
      <Route
        index
        element={
          <PhaseContainerConfigurer
            className="index-chat"
            hideFooterMenu
            contentClass=" "
            headTitle={<span className="ellipsis ">Чат {chat.title}</span>}
            head={<SecretChatHead />}
            content={
              <>
                <CssSecretChatMessage />
                <StyledSecretChat ref={chatRef}>
                  <StyledMessagesList
                    ref={listRef}
                    className="full-size"
                    $lastReadMessageId={initialLastReadTs}
                  >
                    {messageTssRef.current
                      .slice(limits.start, limits.finish)
                      .map((messageId, messageIdi, messageIda) => {
                        if (messagesHash[messageId]?.isRemoved) return null;

                        return (
                          <SecretChatMessage
                            key={messageId}
                            message={messagesHash[messageId]!}
                            prevMessage={messagesHash[messageIda[messageIdi - 1]]}
                          />
                        );
                      })}
                  </StyledMessagesList>
                  <StyledMessageInputPanel
                    listRef={listRef}
                    setLimits={updateLimits}
                    setInitialLastReadTs={setInitialLastReadTs}
                    scrollToAccentMessage={scrollToAccentMessage}
                  />
                  <StyledReplyFloatIconBox ref={replyFloatIconBoxRef}>
                    <StyledSecretChatReplyIcon withoutAnimation />
                  </StyledReplyFloatIconBox>
                  {contextOfMessageTs && (
                    <MessageContextMenu
                      messageId={contextOfMessageTs}
                      listRef={listRef}
                    />
                  )}
                </StyledSecretChat>
              </>
            }
          />
        }
      />

      <Route
        path="manage"
        element={<ChatManagePage />}
      />
    </Routes>
  );
};

export const SecretChatPage = () => {
  const chatId = (useParams().chatId as SecretChat.ChatId) ?? SecretChat.ChatId.def;
  const chat = useAtomValue(secretChatFacesAtom)[chatId ?? SecretChat.ChatId.def];
  // const chatLastReadTs = useAtomValue(secretChatsLastReadTsAtom)[chatId ?? SecretChat.ChatId.def];
  const isAlternativeListUse = useAtomValue(secretChatsIsAlternativeMessageHashMapAtom)[
    chatId ?? SecretChat.ChatId.def
  ];
  const messagesHashMapValue = useChatMessagesHashMapValue(chatId);
  const messagesHashMapAlternativeValue = useChatAlternativeMessagesHashMapValue(chatId);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const messagesHashMap =
    (isAlternativeListUse ? messagesHashMapAlternativeValue : messagesHashMapValue) ??
    (chat?.messages ? { [chat.messages[0].id]: chat.messages[0] } : {});

  const replyTargets = useChatUnreachedMessagesHashMapValue(chatId);

  const messageTss: SecretChat.StrMessageId[] = useMemo(
    () =>
      messagesHashMap
        ? (Array.from(new Set(MyLib.keys(messagesHashMap))).sort(
            (a, b) => messagesHashMap[b]!.id - messagesHashMap[a]!.id,
          ) as never)
        : [],
    [messagesHashMap],
  );

  if (chat == null || chatId == null)
    return (
      <PhaseContainerConfigurer
        className="index-chat unknown"
        headTitle={<>Чат</>}
        content={<div className="full-size color--ko center">Чат не найден</div>}
      />
    );

  return (
    // <SecretChatLastReadTsContext.Provider value={chatLastReadTs}>
    <SecretChatUnreachedMessagesMessagesHashContext.Provider value={replyTargets}>
      <SecretChatMessagesHashContext.Provider value={messagesHashMap}>
        <SecretChatMessagesTssContext.Provider value={messageTss}>
          <SecretChatIdContext.Provider value={chatId}>
            <SecretChatContext.Provider value={chat}>
              <PageChatInContexts />
            </SecretChatContext.Provider>
          </SecretChatIdContext.Provider>
        </SecretChatMessagesTssContext.Provider>
      </SecretChatMessagesHashContext.Provider>
    </SecretChatUnreachedMessagesMessagesHashContext.Provider>
    // </SecretChatLastReadTsContext.Provider>
  );
};
