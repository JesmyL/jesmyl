import { FileStore } from 'back/complect/FileStore';
import { IScheduleWidget } from 'shared/api';

export const schedulesFileStore = new FileStore<IScheduleWidget[]>('/apps/index/schs.json', []);
