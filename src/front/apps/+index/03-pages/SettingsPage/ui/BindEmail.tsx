import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { makeToastOKMoodConfig } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { IndexEmailConfirm } from '$index/entities/EmailConfirm/ui/Confirm';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useState } from 'react';
import { itNIt } from 'shared/utils';
import { toast } from 'sonner';

export const IndexSettingsBindEmail = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BrutalItem
        iconNode={<LazyIcon icon="Mail01" />}
        title="Привязать E-mail"
        onClick={() => setIsOpen(itNIt)}
        box={<LazyIcon icon={isOpen ? 'ArrowUp01' : 'ArrowDown01'} />}
      />
      {isOpen && (
        <IndexEmailConfirm
          onConfirm={async otp => {
            const { fioOrNick } = await indexTsjrpcClientMethods.bindEmailByOTP({ otp });
            toast(`${fioOrNick} привязан к текущему аккаунту`, makeToastOKMoodConfig());
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
};
