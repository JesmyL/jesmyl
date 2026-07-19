import { useAtomValue } from 'atomaric';
import { CmCom } from 'shared/const/cm/Com';
import { checkIsNotNil } from 'shared/utils/checkIs';
import { cmPlayerBroadcastAudioSrcAtom } from '../state/broadcast.atoms';
import { useCmComCurrentMarkTimei } from './useCmComCurrentMarkTime';
import { useCmComMarkTextValuesMaker } from './useCmComMarkTextValuesMaker';

export const useCmComCurrentMarkValues = (com: CmCom | und) => {
  const link = useAtomValue(cmPlayerBroadcastAudioSrcAtom);
  const { takeSlide, timeSlideDict, markTimes } = useCmComMarkTextValuesMaker(com, link);
  const currentMarkTimei = useCmComCurrentMarkTimei(markTimes);

  const currentTimeMark = markTimes[currentMarkTimei];

  const nextTimeMark =
    markTimes
      .slice(currentMarkTimei + 1)
      .find(
        (time, timei, timea) =>
          checkIsNotNil(timeSlideDict[currentTimeMark]) &&
          timeSlideDict[time] !== timeSlideDict[currentTimeMark] &&
          Math.abs(time - timea[timei + 1]) > 1,
      ) ?? markTimes[currentMarkTimei + 1];

  const nextSlide = timeSlideDict[nextTimeMark];
  const slide = takeSlide(currentMarkTimei);

  return {
    isTechnicalText: slide?.ord.isChBlock(),
    isNextTechnicalText: nextSlide?.ord.isChBlock(),
    html: slide?.lines.join('\n') || '',
    nextHtml: nextSlide?.lines.join('\n') || '',
  };
};
