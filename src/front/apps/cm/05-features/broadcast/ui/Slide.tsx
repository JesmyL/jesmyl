import { CmBroadcastSchWgtLiveDataValue } from '$cm/ext';
import { CmBroadcastScreen, CmBroadcastScreenConfig } from '$cm/widgets/broadcast';
import styled from 'styled-components';

type Props = CmBroadcastSchWgtLiveDataValue & {
  text: string;
  nextText: string;
  config: CmBroadcastScreenConfig;
  subUpdates: number | string | und;
};

export const CmBroadcastLiveSlide = (props: Props) => {
  return (
    <Container className="flex center full-size">
      <CmBroadcastScreen
        {...props}
        className="inline-flex center white-pre-children"
        html={props.text}
        cmConfig={props.config}
        isVisible
        freshSlideKey={`${props.text}//${props.slidei}`}
        slideSwitchDir={props.dir}
      />
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  margin: auto;
`;
