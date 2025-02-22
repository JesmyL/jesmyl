import { SourceBased } from '#shared/lib/SourceBased';
import { CmComWid, CmMeetingEventWid } from './enums';

export interface IExportableMeetingsEvent {
  n: string; // название из IExportableMeetings.names
  w: CmMeetingEventWid; // уникальный айди
  r: num; // регулярное ли
  b: number; // время начала
  e: number; // время окончания
  s: CmComWid[]; // список песен
  c: number; // контекстуальная группа
  h?: IExportableMeetingsEventHistoryItem[]; // история
}

interface IExportableMeetingsEventHistoryItem {
  w: number;
  s?: CmComWid[]; // stack
}

export interface IExportableMeetingsContext {
  c: number[];
}

export class MeetingsContext extends SourceBased<IExportableMeetingsContext> {
  get context() {
    return this.getBasic('c');
  }
  set context(val) {
    this.setExportable('c', val);
  }
}

export type MeetingsContextMap = Record<number, MeetingsContext>;
export type IExportableMeetingsContextMap = Record<number, IExportableMeetingsContext>;

export interface IExportableMeetings {
  names?: string[];
  events?: IExportableMeetingsEvent[];
  contexts: IExportableMeetingsContextMap;
}

export interface MeetingsContextBox {
  id: number;
  name: string;
}
