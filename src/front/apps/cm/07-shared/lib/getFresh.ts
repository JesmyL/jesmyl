import { cmIDB } from '$cm/ext';
import { CmComWid } from 'shared/api';
import { cmTsjrpcClient } from '../tsjrpc';

export const getCmComFreshAudioMarksPack = async (comw: CmComWid) => {
  const markPack = await cmIDB.tb.comAudioTrackMarks_v1.get(comw);
  try {
    return (
      (await cmTsjrpcClient.takeFreshComAudioMarksPack({ mod: markPack?.m || 0, comw }, { timeout: 5000 }))?.marks ??
      (await cmIDB.tb.comAudioTrackMarks_v1.get(comw))?.marks
    );
  } catch (_e) {
    return (await cmIDB.tb.comAudioTrackMarks_v1.get(comw))?.marks;
  }
};
