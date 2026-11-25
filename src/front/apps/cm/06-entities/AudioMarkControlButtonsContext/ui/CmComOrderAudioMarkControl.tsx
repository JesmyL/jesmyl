import { CmBroadcastSlidesContext } from '$cm/ext';
import { TextCase } from 'shared/model/common';
import { CmAudioMarkControlButtonsContextProps } from '../model/common';
import { CmAudioMarkControlButtonsContextChild } from './AudioMarkControlButtonsChild';

export const CmAudioMarkControlButtonsContext = (props: CmAudioMarkControlButtonsContextProps) => {
  return (
    <CmBroadcastSlidesContext textCase={TextCase.AsIs}>
      <CmAudioMarkControlButtonsContextChild {...props} />
    </CmBroadcastSlidesContext>
  );
};
