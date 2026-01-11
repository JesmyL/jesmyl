import { CmCom } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { cmPlayerBroadcastAudioSrcAtom } from '../state/broadcast.atoms';
import { useCmComCurrentMarkTimei } from './useCmComCurrentMarkTime';
import { useCmComMarkTextValuesMaker } from './useCmComMarkTextValuesMaker';

export const useCmComCurrentMarkValues = (com: CmCom | und) => {
  const link = useAtomValue(cmPlayerBroadcastAudioSrcAtom);
  const { makeRepeatedText, makeText, markTextDict, technicalTextPrefix, markTimes } = useCmComMarkTextValuesMaker(
    com,
    link,
  );
  const currentMarkTimei = useCmComCurrentMarkTimei(markTimes);

  const currentTimeMark = markTimes[currentMarkTimei];

  const nextTimeMark =
    markTimes
      .slice(currentMarkTimei + 1)
      .find(
        (time, timei, timea) =>
          markTextDict[currentTimeMark] != null &&
          markTextDict[time] !== markTextDict[currentTimeMark] &&
          Math.abs(time - timea[timei + 1]) > 1,
      ) ?? markTimes[currentMarkTimei + 1];

  const nextText = markTextDict[nextTimeMark];
  const isNextTechnicalText = nextText?.startsWith(technicalTextPrefix);

  const { isTechnicalText, text } = makeText(currentMarkTimei);

  return {
    isTechnicalText,
    isNextTechnicalText,
    html: text,
    nextHtml: makeRepeatedText(
      isNextTechnicalText ? nextText?.slice(technicalTextPrefix.length) : nextText,
      nextTimeMark,
    ),
  };
};
