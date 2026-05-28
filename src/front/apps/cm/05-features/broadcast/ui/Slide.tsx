import { CmBroadcastSchWgtLiveDataValue } from '$cm/ext';
import { CmBroadcastScreen } from '$cm/widgets/broadcast';

type Props = CmBroadcastSchWgtLiveDataValue & {
  subUpdates: number | string | und;
};

export const CmBroadcastLiveSlide = (props: Props) => {
  return (
    <div className="flex center full-size overflow-hidden m-auto">
      <CmBroadcastScreen
        {...props}
        className="inline-flex center white-pre-children"
        text={props.text}
        cmConfig={props.config}
        isVisible
        freshSlideKey={`${props.text}//${props.slideId}`}
        slideSwitchDir={props.dir}
      />
    </div>
  );
};
