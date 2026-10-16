import { cmIDB } from '$cm/ext';
import { CmComAudioMarkPack, CmComWid } from 'shared/api';
import { cmTsjrpcClient } from '../tsjrpc';

/** In-flight fresh-marks requests keyed by comw, so concurrent callers share one server round-trip. */
const inFlightFreshAudioMarksPacks = new Map<CmComWid, Promise<CmComAudioMarkPack | nil>>();

const requestFreshAudioMarksPack = async (comw: CmComWid) => {
  const markPack = await cmIDB.tb.comAudioTrackMarks_v3.get(comw);

  try {
    return (
      (await cmTsjrpcClient.takeFreshComAudioMarksPack_v1({ mod: markPack?.m || 0, comw }, { timeout: 5000 }))?.marks ??
      (await cmIDB.tb.comAudioTrackMarks_v3.get(comw))?.marks
    );
  } catch (_e) {
    return (await cmIDB.tb.comAudioTrackMarks_v3.get(comw))?.marks;
  }
};

export const getCmComFreshAudioMarksPack = (comw: CmComWid): Promise<CmComAudioMarkPack | nil> => {
  const inFlight = inFlightFreshAudioMarksPacks.get(comw);
  if (inFlight) return inFlight;

  const job = requestFreshAudioMarksPack(comw);
  const clearInFlight = () => inFlightFreshAudioMarksPacks.delete(comw);

  inFlightFreshAudioMarksPacks.set(comw, job);
  job.then(clearInFlight, clearInFlight);

  return job;
};
