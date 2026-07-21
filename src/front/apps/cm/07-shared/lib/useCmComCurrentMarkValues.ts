import { useAtomValue } from 'atomaric';
import { CmCom } from 'shared/const/cm/Com';
import { TextCase } from 'shared/model/common';
import { makeCmComNbspHtmlText } from 'shared/utils/cm/com/const';
import { cmPlayerBroadcastAudioSrcAtom } from '../state/broadcast.atoms';
import { useCmComAudioMarkSlides } from './useCmComAudioMarkSlides';
import { useCmComCurrentMarkTimei } from './useCmComCurrentMarkTime';

export const useCmComCurrentMarkValues = (com: CmCom | und, textCase: TextCase | nil) => {
  const link = useAtomValue(cmPlayerBroadcastAudioSrcAtom);
  const { markTimes, audioSlides } = useCmComAudioMarkSlides(com, link, textCase);
  const slidei = useCmComCurrentMarkTimei(markTimes, audioSlides);

  const nextSlide = audioSlides.at(slidei + 1);
  const slide = audioSlides.at(slidei);

  return {
    isChorded: slide?.isChorded,
    isNextChorded: nextSlide?.isChorded,
    html: makeCmComNbspHtmlText(slide?.text || ''),
    nextHtml: makeCmComNbspHtmlText(nextSlide?.text || ''),
    minText: slide?.minText,
    audioSlides,
    slidei,
  };
};
