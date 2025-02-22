import { BottomPopup } from '#shared/ui/absolute-popup/bottom-popup/BottomPopup';
import { useState } from 'react';
import { LocalSokiAuth } from 'shared/api';
import styled from 'styled-components';
import { UserMore } from './UserMore';

export const IndexProfileInfo = ({ auth }: { auth: LocalSokiAuth }) => {
  const [isShowAva, setIsShowAva] = useState(true);
  const [isUserMoreOpen, setIsUserMoreOpen] = useState<unknown>(false);

  return (
    <>
      <div
        id="profile-info"
        className="flex center flex-gap"
        onClick={setIsUserMoreOpen}
      >
        <Name className="ellipsis">{auth.fio}</Name>
        {isShowAva && auth.tgAva && (
          <Ava
            src={auth.tgAva}
            onError={() => setIsShowAva(false)}
          />
        )}
      </div>
      {isUserMoreOpen && (
        <BottomPopup onClose={setIsUserMoreOpen}>
          <UserMore onClose={setIsUserMoreOpen} />
        </BottomPopup>
      )}
    </>
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
