import { MessageType as PMessageType } from '@prisma/client';

declare module 'SecretChat' {
  export const enum ChatId {
    def = '',
  }

  export const enum MessageId {
    def = 0,
    one = 1,
  }

  export const enum MemberId {
    def = 0,
  }

  export const enum UserId {
    def = 0,
  }

  export type StrMessageId = `${MessageId}`;

  export type MessageType = PMessageType;

  export type MessageDraftType = 'text' | 'reply' | 'edit';

  export type MessagesHashMap = Partial<Record<SecretChat.MessageId, SecretChat.ImportableMessage>>;

  export type MessageDraft = {
    text: string;
    prevSimpleMessageText: string;
    editId?: MessageId;
    replyId?: MessageId;
  };

  export interface ImportableMessage extends ExportableMessage {
    id: MessageId;
    createdAt: string;
    sentMemberId: MemberId;
    isRemoved?: boolean;
  }

  export interface ExportableMessage {
    text: string;
    prevText?: string | nil;
    type: MessageType;
    replyMessageId?: MessageId | nil;
    editMessageId?: MessageId | nil;
  }

  export type ChatMemberUser = { fio: string; id: UserId; login: string };
  export type ChatMember = { user: ChatMemberUser; id: MemberId };
  export type UserMiniInfo = Pick<ChatMemberUser, 'fio'>;

  export interface ChatMiniInfo {
    chatId: ChatId;
    title: string;
    messages: ImportableMessage[];
    members: ChatMember[];
  }

  export type ChatLastReadTimeStamp = { messageId: SecretChat.MessageId; chatId: SecretChat.ChatId };

  export const editableMessageTypesSet = new Set<MessageType>(['BigText', 'Text']);
}
