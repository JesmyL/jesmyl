import { useCmCom } from '$cm/entities/com';

interface Props {
  comw?: number;
}

export const CmBroadcastSlideMiniInfo = (props: Props) => {
  return <span>{useCmCom(props.comw)?.name}</span>;
};
