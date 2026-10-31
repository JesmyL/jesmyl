import { electronPresentationTsjrpcClientMethods } from '#basis/tsjrpc.electron/presentation.cli.methods';
import { electronPresentationsTsjrpcClientMethods } from '#basis/tsjrpc.electron/presentations.cli.methods';
import { broadcastCurrentTextAppAtom, broadcastNextLiveDataAtom, broadcastPresentationsLiveDataAtom } from '#features/broadcast/atoms';
import { presentationBroadcastDefaultConfig } from '#features/broadcast/complect/defaults';
import { BroadcastLiveData } from '#features/broadcast/Broadcast.model';
import { sendBroadcastLiveData } from '#features/broadcast/lib/broadcast-live-data';
import { HorizontalDirection } from '#shared/model/Direction';
import { presentationsCurrentFilePathAtom, presentationsCurrentSlidAtom, presentationsCurrentSlidesAtom } from '$presentations/shared/state/broadcast.atoms';
import { PresentationSlide, presentationsTool } from '$presentations/shared/model/model';
import { ScheduleWidgetWidDef } from 'shared/api';
import { presentationProjectorTool } from 'shared/model/electron';

export const openPresentationFile = async (filePath: string) => {
  const slides = await electronPresentationsTsjrpcClientMethods.openPresentation({ filePath }, presentationsTool);

  if (!slides) throw `Presentation "${filePath}" is unavailable`;

  presentationsCurrentFilePathAtom.set(filePath);
  presentationsCurrentSlidesAtom.set(slides);
  presentationsCurrentSlidAtom.set(null);

  return slides;
};

export const publishPresentationSlide = async (slides: PresentationSlide[], slid: number) => {
  broadcastCurrentTextAppAtom.set('presentations');

  const presentations = {
    slides,
    slid,
    config: presentationBroadcastDefaultConfig,
  };

  const liveData: BroadcastLiveData = {
    schw: ScheduleWidgetWidDef,
    data: {
      app: 'presentations',
      fio: '',
      isHide: false,
      presentations,
    },
  };

  presentationsCurrentSlidAtom.set(slid);
  broadcastPresentationsLiveDataAtom.set(presentations);
  broadcastNextLiveDataAtom.set(liveData);

  await electronPresentationTsjrpcClientMethods.show(liveData, presentationProjectorTool);
  sendBroadcastLiveData(liveData);
};

export const switchPresentationSlideByDirection = (direction: HorizontalDirection) => {
  const slides = presentationsCurrentSlidesAtom.get();
  if (!slides?.length) return false;

  const currentSlidei = slides.findIndex(slide => slide.slid === presentationsCurrentSlidAtom.get());
  const slide = slides[currentSlidei + direction];

  if (!slide) return false;

  void publishPresentationSlide(slides, slide.slid);

  return true;
};
