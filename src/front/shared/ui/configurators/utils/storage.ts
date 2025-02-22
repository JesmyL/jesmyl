import { JStorage } from '#shared/lib/JStorage';
import { MyFileType } from 'shared/api';

export const filesStorage = new JStorage<Record<MyFileType, Record<string, File>>>('files');
