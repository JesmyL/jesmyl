import { SokiAuthLogin } from 'shared/api';
import { StoragesRackCardField, StoragesRackDefinitionField } from './rack.model';

export const enum StoragesRackWid {
  def = 0,
}

export const enum StoragesRackCardMi {
  min = 1,
}

export type StoragesRackStatus = {
  title: string;
  icon?: KnownStameskaIconName;
  next?: number[];
  color?: string;
};

export type StoragesRackCard = {
  mi: StoragesRackCardMi;
  status?: number;
  title: string;
  note?: string;
  meta?: string;
  fields?: (StoragesRackCardField | nil)[];
};

export enum StoragesRackMemberRole {
  Requester = 0,
  Creator,
  Admin,
}
export type StoragesRackMember = {
  fio: string;
  role: StoragesRackMemberRole;
};

export type StoragesRack = {
  w: StoragesRackWid;
  icon?: KnownStameskaIconName;
  title: string;
  statuses: StoragesRackStatus[];
  team: PRecord<SokiAuthLogin, StoragesRackMember>;
  list: StoragesRackCard[];
  values: string[];
  fields: StoragesRackDefinitionField[];
};
