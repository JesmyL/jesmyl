import { useCcom } from '../../../col/com/useCcom';

interface Props {
  comw?: number;
}

export const CmTranslationSlideMiniInfo = (props: Props) => {
  return <span>{useCcom(props.comw)?.name}</span>;
};
