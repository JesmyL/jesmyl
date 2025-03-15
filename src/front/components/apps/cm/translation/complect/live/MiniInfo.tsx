import { useCom } from '$cm/basis/lib/com-selections';

interface Props {
  comw?: number;
}

export const CmTranslationSlideMiniInfo = (props: Props) => {
  return <span>{useCom(props.comw)?.name}</span>;
};
