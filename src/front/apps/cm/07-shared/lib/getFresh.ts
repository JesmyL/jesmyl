import { cmIDB } from '$cm/ext';
import { HttpLink } from 'shared/api';
import { cmTsjrpcClient } from '../tsjrpc';

export const getCmComFreshAudioMarksPack = async (src: HttpLink) => {
  const markPack = await cmIDB.tb.audioTrackMarks.get(src);
  return (
    (await cmTsjrpcClient.takeFreshComAudioMarksPack({ lastModfiedAt: markPack?.m || 0, src }))?.marks ??
    (await cmIDB.tb.audioTrackMarks.get(src))?.marks
  );
};
