import { CmComListPackKindSelector } from '$cm/entities/ComListPackKindSelector';
import { CmComFaceList } from '$cm/ext';
import { useCmBroadcastScreenComNavigationComws, useCmBroadcastSlidesContext } from '$cm/features/broadcast';
import styled from '@emotion/styled';

export const CmBroadcastGridTabList = () => {
  const { comPack, comws } = useCmBroadcastScreenComNavigationComws();
  const { setSlidei } = useCmBroadcastSlidesContext();

  return (
    <div className="broadcast-com-list">
      <div className="m-5">
        <CmComListPackKindSelector />
      </div>

      <StyledComFaceList
        list={comws}
        titles={comPack.titles}
        importantOnClick={({ defaultClick }) => {
          setSlidei(0);
          defaultClick();
        }}
      />
    </div>
  );
};

const StyledComFaceList = styled(CmComFaceList)`
  min-height: calc(var(--max-size) + 1px);
`;
