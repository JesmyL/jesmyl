import { InviteGuest, Prisma } from '@prisma/client';
import { TBInvites } from 'back/db/TBInvites';
import TelegramBot from 'node-telegram-bot-api';
import { IsInvitedGuestCome } from 'shared/api';
import { itNNull } from 'shared/utils';
import { jesmylTgBot } from '../bot';

const inners = {
  newChannelName: 'newChannelName',
  guestManaging: 'guestManaging',
  guestInfoMessage: 'guestInfoMessage',
} as const;

type InnerKey = keyof typeof inners;

const makeInnerId = (key: InnerKey) => {
  return `\n\n<span class="tg-spoiler">Системная информация %invites:${inners[key]}%</span>`;
};

const markups: Partial<Record<InnerKey, TelegramBot.InlineKeyboardMarkup>> = {
  [inners.guestManaging]: {
    inline_keyboard: [
      [{ text: 'Добавить гостей', callback_data: '/addGuestsInfo' }],
      [{ text: 'Посмотреть ID встречи', callback_data: '/showMeetId' }],
    ],
  },
};

const makeMessageTextsWithInnerId = (text: string, key: InnerKey) => {
  return [
    `${text}${makeInnerId(key)}`,
    {
      parse_mode: 'HTML',
      reply_markup: markups[key],
    } satisfies TelegramBot.SendMessageOptions,
  ] as const;
};

const checkIsMessageWithId = (text: string, key: InnerKey) => text.includes(`%invites:${key}%`);

const inviteLinkPrefix = 'https://invite.jesmyl.ru/#/christmas?guest=';
const makeInviteLink = (guest: InviteGuest) => `${inviteLinkPrefix}${TBInvites.secretGuestId(guest.id)}`;

const guestsListMessageText = (meetTitle: string, guestsCount: number) => {
  return `Количество приглашённых на ${meetTitle}: ${guestsCount}`;
};

const makeGuestMessageInfo = (guest: InviteGuest) => {
  return [
    `<b>${guest.name}</b>\nГость ${
      guest.isCome === IsInvitedGuestCome.WillBe
        ? 'будет на мероприятии ✅'
        : guest.isCome === IsInvitedGuestCome.Pass
          ? 'НЕ будет на мероприятии ❌'
          : 'ещё не определился ❔'
    }\n\n<code>${makeInviteLink(guest)}</code>${makeInnerId(inners.guestInfoMessage)}`,
    {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [[{ text: 'Обновить данные', callback_data: '/refreshIuestInfoMessage' }]],
      },
    } satisfies TelegramBot.SendMessageOptions,
  ] as const;
};

export const invitesTgBotListener = () => {
  jesmylTgBot.catchCallbackQuery(async (query, bot, answer) => {
    const chatId = query.message?.chat.id;
    if (chatId === undefined) return answer('Чат не найден');

    if (query.data === '/addGuestsInfo')
      return answer({
        text:
          `Для добавления нового приглашённого, сделайте ответ на это сообщение с именем нового гостя,` +
          `или добавьте список, написав каждого гостя с новой строки`,
      });

    if (query.data === '/showMeetId') {
      const meet = await TBInvites.tb.inviteMeeting.findFirst({ where: { chatId } });
      if (meet === null) return answer('Событие не найдено');
      return answer({ text: meet.meetId });
    }

    if (query.data === '/refreshIuestInfoMessage') {
      if (!query.message?.text) return answer('Текста нет');

      const [, idStartedText] = query.message.text.split(inviteLinkPrefix);
      const guest = await TBInvites.tb.inviteGuest.findFirst({
        where: { id: TBInvites.unsecretGuestId(parseInt(idStartedText)) },
      });

      if (guest === null) return answer('Гость не найден');

      const [text, options] = makeGuestMessageInfo(guest);
      bot.editMessageText(text, {
        ...options,
        chat_id: chatId,
        message_id: query.message.message_id,
      });

      return answer(guest.name);
    }

    if (query.data === '/inviteChatManagment') {
      const meet = await TBInvites.tb.inviteMeeting.findFirst({ where: { chatId } });

      if (meet !== null) return answer(`К чату привязано мероприятие ${meet.title}`);

      bot.sendMessage(
        chatId,
        ...makeMessageTextsWithInnerId(
          `Для того, чтоб сделать эту беседу базой для приглашений,` +
            ` ответным сообщением на данное отправьте название мероприятия`,
          inners.newChannelName,
        ),
      );

      return answer('Инициализация');
    }

    return answer('NO');
  });

  jesmylTgBot.catchMessages(async (message, bot) => {
    if (message.text === undefined) return;

    if (message.reply_to_message?.text) {
      const chatId = message.chat.id;

      if (checkIsMessageWithId(message.reply_to_message.text, inners.newChannelName)) {
        const meet = await TBInvites.tb.inviteMeeting.findFirst({ where: { chatId } });

        if (meet !== null) return;

        const newMeet = await TBInvites.tb.inviteMeeting.create({ data: { chatId, title: message.text.trim() } });

        bot.sendMessage(
          chatId,
          ...makeMessageTextsWithInnerId(guestsListMessageText(newMeet.title, 0), inners.guestManaging),
        );
        bot.deleteMessage(chatId, message.reply_to_message.message_id);
      }

      if (checkIsMessageWithId(message.reply_to_message.text, inners.guestManaging)) {
        const meet = await TBInvites.tb.inviteMeeting.findFirst({ where: { chatId } });

        if (meet === null) return;

        const guestNames = message.text.split(/\s*\n+\s*/);

        const ununiqueGuestsSet = new Set(
          (
            await TBInvites.tb.inviteGuest.findMany({
              where: { name: { in: guestNames } },
              select: { name: true },
            })
          ).map(g => g.name),
        );

        const uniqueGuestNames = guestNames.map(name => (ununiqueGuestsSet.has(name) ? null : name)).filter(itNNull);

        await TBInvites.tb.inviteGuest.createMany({
          data: uniqueGuestNames.map((name): Prisma.InviteGuestCreateManyInput => {
            return {
              isCome: IsInvitedGuestCome.Ignored,
              meetId: meet.id,
              name,
            };
          }),
        });

        uniqueGuestNames.forEach(async name => {
          const guest = await TBInvites.tb.inviteGuest.findFirst({ where: { name } });
          if (guest === null) return;

          jesmylTgBot.bot.sendMessage(chatId, ...makeGuestMessageInfo(guest));
        });

        const guestList = await TBInvites.tb.inviteGuest.count({ where: { meetId: meet.id } });

        const [text, options] = makeMessageTextsWithInnerId(
          guestsListMessageText(meet.title, guestList),
          inners.guestManaging,
        );

        bot.editMessageText(text, {
          ...options,
          message_id: message.reply_to_message.message_id,
          chat_id: message.chat.id,
        });

        bot.deleteMessage(chatId, message.message_id);
      }
    }
  });
};
