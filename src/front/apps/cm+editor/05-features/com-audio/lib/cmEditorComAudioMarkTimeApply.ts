import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmComEditorAudioMarksSendPromiseAtom, startCmComAudioMarkDirectChange } from '$cm+editor/shared/state/com';
import { CmAudioTail, CmComAudioMarkPackTime, CmComWid } from 'shared/api';

type Args = {
  newTime: CmComAudioMarkPackTime;
  src: CmAudioTail;
  time: CmComAudioMarkPackTime;
  comw: CmComWid;
};

export const cmEditorComAudioMarkTimeApply = async (args: Args) => {
  const sendPromise = cmComEditorAudioMarksSendPromiseAtom.get();
  if (sendPromise) await sendPromise;

  const done = startCmComAudioMarkDirectChange(args.time);

  try {
    await cmEditComExternalsClientTsjrpcMethods.changeAudioMarkTime_v1(args);
  } finally {
    done();
  }
};
