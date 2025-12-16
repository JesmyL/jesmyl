import { cmIDB } from '$cm/ext';
import { HttpLink } from 'shared/api';
import { cmTsjrpcClient } from '../tsjrpc';

export const getCmComFreshAudioMarksPack = async (src: HttpLink) => {
  const markPack = await cmIDB.tb.audioTrackMarks.get(src);
  try {
    return (
      (
        await cmTsjrpcClient.takeFreshComAudioMarksPack(
          { lastModfiedAt: markPack?.m || 0, src },
          { aborter: { signal: AbortSignal.timeout(5000) } },
        )
      )?.marks ?? (await cmIDB.tb.audioTrackMarks.get(src))?.marks
    );
  } catch (_e) {
    return (await cmIDB.tb.audioTrackMarks.get(src))?.marks;
  }
};
