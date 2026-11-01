import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { IndexUserMoreBindEmailModal } from '$index/entities/UserMore/ui/BindEmail';
import { IndexUserMore } from '$index/entities/UserMore/ui/UserMore';
import { indexIsBindEmailOpenAtom } from '$index/shared/state';
import { useState } from 'react';
import { LocalSokiAuth } from 'shared/api';
import { takeUserAuthName } from 'shared/utils/user.utils';

export const IndexProfileInfo = ({ auth }: { auth: LocalSokiAuth }) => {
  const [isShowAva, setIsShowAva] = useState(true);
  const [isUserMoreOpen, setIsUserMoreOpen] = useState<unknown>(false);

  return (
    <>
      <div
        id="profile-info"
        className="flex center gap-2"
        onClick={setIsUserMoreOpen}
      >
        <div className="ellipsis">{takeUserAuthName(auth)}</div>
        {isShowAva && auth.tgAva && (
          <img
            className="h-[2em] w-[2em] min-h-[2em] min-w-[2em] max-h-[2em] max-w-[2em] rounded-full border-0 inline-block align-middle"
            src={auth.tgAva}
            onError={() => setIsShowAva(false)}
          />
        )}
      </div>
      {isUserMoreOpen && (
        <BottomPopup
          title={<div className="ellipsis">{takeUserAuthName(auth)}</div>}
          onClose={setIsUserMoreOpen}
        >
          <IndexUserMore onClose={setIsUserMoreOpen} />
        </BottomPopup>
      )}
      <IndexUserMoreBindEmailModal openAtom={indexIsBindEmailOpenAtom} />
    </>
  );
};
