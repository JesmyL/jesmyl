import { TBChats } from 'back/db/TBChats';
import { TBInvites } from 'back/db/TBInvites';
import { TBMessages } from 'back/db/TBMessages';
import { TBUsers } from 'back/db/Users';
import { jesmylTgBot } from 'back/sides/telegram-bot/bot';
import { ChatsData, SokiCapsule, SokiServerDoAction, SokiServerDoActionProps } from 'shared/api';
import { Eventer } from 'shared/utils';
import { WebSocket } from 'ws';
import { SokiServerServerStore } from './120-ServerStore';

export class SokiServerOtherEvents extends SokiServerServerStore implements SokiServerDoAction<'OtherEvents'> {
  constructor() {
    super();

    Eventer.listenValue(this.onCapsuleSetValueListeners, capsule => {
      (async () => {
        if (capsule.auth?.login == null) return;
        const chats = await TBChats.getFreshDataForUser(capsule.auth.login);

        this.send(
          {
            appName: 'index',
            chatsData: { chats },
          },
          capsule.client,
        );
      })();
    });
  }

  private async doOnChatsFetchData({ client, eventBody, requestId }: SokiServerDoActionProps) {
    if (eventBody.chatsFetch === undefined) throw new Error();

    if (eventBody.chatsFetch.users) {
      this.send({ appName: 'index', chatsData: { users: await TBUsers.getAll() }, requestId }, client);
    }
  }

  private sendChatsDataToMembers = (
    members: { user: { login: string } }[],
    chatsData: ChatsData,
    senderLogin: string,
    requestId: string | und,
    client: WebSocket,
  ) => {
    this.send({ appName: 'index', chatsData, requestId }, client);

    const messageData = { appName: 'index', chatsData } as const;
    const sendDataForEach = (capsule: SokiCapsule) => this.send(messageData, capsule.client);

    members.forEach(member => {
      const capsules = this.capsulesByLogin.get(member.user.login);
      if (capsules === undefined || member.user.login === senderLogin) return;

      capsules.forEach(sendDataForEach);
    });
  };

  private async doOnChatFetchData(event: SokiServerDoActionProps) {
    if (event.eventBody.chatFetch === undefined) throw new Error();
    const eventFetch = event.eventBody.chatFetch;
    const chatId = eventFetch.chatId;

    if (eventFetch.newMember != null) {
      const { userLogin } = eventFetch.newMember;
      const chat = await TBChats.addMemberToChat(chatId, userLogin);
      if (chat === null) return;

      this.sendChatsDataToMembers(chat.members, { chats: [chat] }, userLogin, event.requestId, event.client);
    }

    if (eventFetch.pullMessages != null) {
      const { messages, unreachedMessages } =
        eventFetch.pullMessages === true
          ? await TBMessages.combineWithRemoved(chatId)
          : await TBMessages.combineWithRemoved(
              chatId,
              eventFetch.pullMessages.messageId,
              eventFetch.pullMessages.isMessageStart,
              eventFetch.pullMessages.fetchCount,
            );
      if (messages === null) return;
      this.send(
        {
          appName: 'index',
          chatsData: {
            messages: { [chatId]: messages },
            unreachedMessages: { [chatId]: unreachedMessages },
          },
        },
        event.client,
      );
    }

    if (eventFetch.pullAlternativeMessagesNearId) {
      const { alternativeMessages, unreachedMessages } = await TBMessages.pullAlternativeNearId(
        chatId,
        eventFetch.pullAlternativeMessagesNearId,
      );

      this.send(
        {
          appName: 'index',
          chatsData: {
            alternativeMessages: { [chatId]: alternativeMessages },
            unreachedMessages: { [chatId]: unreachedMessages },
          },
        },
        event.client,
      );
    }

    if (eventFetch.removeMessages != null) {
      const messagesForRemove = eventFetch.removeMessages;

      this.actionWithCapsule(event.client, async capsule => {
        if (capsule.auth?.login) {
          const { removedMessages, chat } = await TBMessages.removeMessages(
            chatId,
            capsule.auth.login,
            messagesForRemove,
          );

          this.sendChatsDataToMembers(
            chat.members,
            { messages: { [chat.chatId]: removedMessages }, chats: [chat] },
            capsule.auth.login,
            event.requestId,
            capsule.client,
          );
        }
      });
    }
  }

  private async doOnChatFetchMessageData({ client, eventBody, requestId }: SokiServerDoActionProps) {
    if (eventBody.chatFetch?.message === undefined) throw new Error();

    const chatMessage = eventBody.chatFetch.message;
    const chatId = eventBody.chatFetch.chatId;

    this.actionWithCapsule(client, async capsule => {
      if (capsule.auth?.login == null) return;
      const senderLogin = capsule.auth.login;

      if (chatMessage.type === 'ChatCreate') {
        const chat = await TBChats.createChat(senderLogin, chatMessage.text);
        if (chat?.members != null) {
          this.sendChatsDataToMembers(chat.members, { chats: [chat] }, senderLogin, requestId, client);
        }
        return;
      }

      if (chatMessage.editMessageId) {
        const { chat, newMessage } = await TBMessages.editMessage(
          chatId,
          senderLogin,
          chatMessage.editMessageId,
          chatMessage.text,
          chatMessage.type,
        );

        if (chat?.members != null && newMessage != null) {
          this.sendChatsDataToMembers(
            chat.members,
            { chats: [chat], messages: { [chat.chatId]: [newMessage] } },
            senderLogin,
            requestId,
            client,
          );
        }
        return;
      }

      try {
        const { chat, sentMessage, unreachedMessages } = await TBMessages.sendSimpleMessage(
          chatId,
          senderLogin,
          chatMessage,
        );

        this.sendChatsDataToMembers(
          chat.members,
          {
            messages: { [chat.chatId]: [sentMessage] },
            unreachedMessages: { [chat.chatId]: unreachedMessages },
          },
          senderLogin,
          requestId,
          client,
        );
      } catch (error) {
        console.error(error);
      }
    });
  }

  async doOnOtherEvents(event: SokiServerDoActionProps) {
    if (event.eventBody.inviteGuestData) {
      const { meetId, guestId } = event.eventBody.inviteGuestData;

      if (event.eventBody.inviteGuestData.getData) {
        const guest = await TBInvites.tb.inviteGuest.findFirst({
          where: { meet: { meetId }, id: TBInvites.unsecretGuestId(guestId) },
          select: { isCome: true, name: true },
        });

        if (guest) {
          this.send(
            {
              appName: 'index',
              invitedGuest: guest,
              requestId: event.requestId,
            },
            event.client,
          );
        }
      }

      if (event.eventBody.inviteGuestData.setIsCome != null) {
        const isCome = event.eventBody.inviteGuestData.setIsCome;
        const meet = await TBInvites.tb.inviteMeeting.findFirst({ where: { meetId } });

        if (meet !== null) {
          const guest = await TBInvites.tb.inviteGuest.findFirst({
            where: { meet: { meetId }, id: TBInvites.unsecretGuestId(guestId) },
          });

          if (guest !== null) {
            await TBInvites.tb.inviteGuest.update({ data: { isCome }, where: { id: guest.id } });

            jesmylTgBot.bot.sendMessage(Number(meet.chatId), `Гость <code>${guest.name}</code> будет присутствовать`, {
              parse_mode: 'HTML',
            });

            this.send(
              {
                appName: 'index',
                invitedGuest: { isCome, name: guest.name },
                requestId: event.requestId,
              },
              event.client,
            );
          }
        }
      }
    }

    try {
      await this.doOnChatFetchMessageData(event);
      return false;
    } catch (e) {}

    try {
      await this.doOnChatsFetchData(event);
      return false;
    } catch (e) {}

    try {
      await this.doOnChatFetchData(event);
      return false;
    } catch (e) {}

    return false;
  }
}
