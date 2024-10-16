import { useState } from 'react';
import styled from 'styled-components';
import { LocalSokiAuth } from '../../../../models';

export const IndexProfileInfo = ({ auth }: { auth: LocalSokiAuth }) => {
  const [isShowAva, setIsShowAva] = useState(true);

  return (
    <div className="flex center flex-gap">
      <Name className="ellipsis">{auth.fio}</Name>
      {isShowAva && auth.tgAva && (
        <Ava
          src={auth.tgAva}
          onError={() => setIsShowAva(false)}
        />
      )}
    </div>
  );
};

const size = '2em';

const Ava = styled.img`
  height: ${size};
  width: ${size};

  min-height: ${size};
  min-width: ${size};

  max-height: ${size};
  max-width: ${size};

  border-radius: 50%;
  border: 0;
  display: inline-block;
  vertical-align: middle;
`;

const Name = styled.div``;
