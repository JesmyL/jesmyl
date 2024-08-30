import styled from 'styled-components';
import { CmTranslationScreenConfig } from '../controlled/model';
import { CmTranslationScreen } from '../controlled/screen/CmTranslationScreen';

interface Props {
  text: string;
  nextText: string;
  config: CmTranslationScreenConfig;
  subUpdates: number | string | und;
}

export const CmLiveTranslationSlide = (props: Props) => {
  return (
    <Container className="flex center full-size">
      <CmTranslationScreen
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
