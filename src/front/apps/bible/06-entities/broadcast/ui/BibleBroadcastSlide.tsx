import { BibleBroadcastScreenScreen } from '$bible/entities/broadcast-screen';
import { BibleAddressTextContext, BibleTextMapBlocksContentContext } from '$bible/shared/contexts/texts';
import styled from '@emotion/styled';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';

export const BibleBroadcastSlide = ({
  config,
  texts,
  addressText,
}: Required<IndexSchWBroadcastLiveDataValue>['bible']) => {
  return (
    <Container className="flex center full-size">
      <BibleTextMapBlocksContentContext value={texts}>
        <BibleAddressTextContext value={addressText}>
          <BibleBroadcastScreenScreen
            win={window}
            isVisible
            bibleConfig={config}
          />
        </BibleAddressTextContext>
      </BibleTextMapBlocksContentContext>
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  margin: auto;
`;
