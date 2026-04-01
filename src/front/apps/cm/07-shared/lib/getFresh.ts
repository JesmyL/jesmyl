import { cmIDB } from '$cm/ext';
import { HttpNumLeadLink } from 'shared/api';
import { cmTsjrpcClient } from '../tsjrpc';

export const getCmComFreshAudioMarksPack = async (src: HttpNumLeadLink) => {
  const markPack = await cmIDB.tb.comAudioTrackMarks.get(src);
  try {
    return (
      (
        await cmTsjrpcClient.takeFreshComAudioMarksPack(
          { mod: markPack?.m || 0, src },
          { aborter: { signal: AbortSignal.timeout(5000) } },
        )
      )?.cMarks ?? (await cmIDB.tb.comAudioTrackMarks.get(src))?.cMarks
    );
  } catch (_e) {
    return (await cmIDB.tb.comAudioTrackMarks.get(src))?.cMarks;
  }
};
