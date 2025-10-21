import { CmBroadcastScreen, CmBroadcastScreenConfig } from '$cm/widgets/broadcast';
import styled from 'styled-components';

interface Props {
  text: string;
  nextText: string;
  config: CmBroadcastScreenConfig;
  subUpdates: number | string | und;
}

export const CmBroadcastLiveSlide = (props: Props) => {
  return (
    <Container className="flex center full-size">
      <CmBroadcastScreen
        className="inline-flex center white-pre-children"
        html={props.text}
        subUpdates={props.subUpdates}
        cmConfig={props.config}
        text={props.text}
        nextText={props.nextText}
        isVisible
      />
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  margin: auto;
`;
