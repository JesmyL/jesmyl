import { translateBase } from '#basis/locale';
import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { useCmComCurrent } from '$cm/entities/com';
import { cmAppActions } from '$cm/shared/const';
import { useComNumber } from '$cm/shared/lib';
import { Atom, atom } from 'atomaric';
import { CmComWidDef, MenuComToolName } from 'shared/api';
import { CmComTool } from '../ComTool';

let isOpenQrAtom: Atom<boolean>;

export const CmComToolQrComShare = () => {
  isOpenQrAtom ??= atom(false);

  const ccom = useCmComCurrent();
  const comw = ccom?.wid ?? CmComWidDef;
  const comNumber = useComNumber(comw);

  const toolNode = (
    <CmComTool
      title={translateBase(it => it.cm.com.tool[MenuComToolName.QrShare])}
      icon="QrCode"
      onClick={isOpenQrAtom.do.toggle}
    />
  );

  if (!ccom) return toolNode;

  const link = cmAppActions.makeLink({ comw: ccom.wid });

  return (
    <>
      {toolNode}

      <QrCodeFullScreen
        openAtom={isOpenQrAtom}
        text={link}
        copyText={`${link} - ${comNumber == null ? '' : `${comNumber}. `}${ccom.name}`}
      />
    </>
  );
};
