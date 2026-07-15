import { useCmCom } from '$cm/entities/com';
import { CmComWid } from 'shared/api';

interface Props {
  comw?: CmComWid;
}

export const CmBroadcastSlideMiniInfo = (props: Props) => {
  return <span>{useCmCom(props.comw)?.name}</span>;
};
