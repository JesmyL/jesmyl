import { MyFileType } from 'shared/api';
import { JStorage } from '../../JStorage';

export const filesStorage = new JStorage<Record<MyFileType, Record<string, File>>>('files');
