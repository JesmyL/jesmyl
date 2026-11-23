import { takeBaseLanguageAtom } from '#basis/state/locale';
import { useAtomValue } from 'atomaric';
import { translateBaseDefine } from 'shared/utils/locale/translate';

export const useRemoteBroadcastTranslate = () => translateBaseDefine(useAtomValue(takeBaseLanguageAtom()));
