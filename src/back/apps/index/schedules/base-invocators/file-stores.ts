import { FileStore } from 'back/complect/FileStorage';
import { IScheduleWidget } from 'shared/api';

export const schedulesFileStore = new FileStore<IScheduleWidget[]>('/apps/index/schs.json', []);
