import { useCmCom } from '$cm/entities/com';

interface Props {
  comw?: number;
}

export const CmTranslationSlideMiniInfo = (props: Props) => {
  return <span>{useCmCom(props.comw)?.name}</span>;
};
