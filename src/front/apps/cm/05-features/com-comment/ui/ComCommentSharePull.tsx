import { Button } from '#shared/components/ui/button';
import { Skeleton } from '#shared/components/ui/skeleton';
import { mylib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalFooter } from '#shared/ui/modal/Modal/ModalFooter';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { useCmCom } from '$cm/entities/com';
import { cmComCommentAltKeyAtom, cmComCommentRegisteredAltKeysAtom } from '$cm/entities/com-comment';
import { cmComShareComCommentPropsAtom } from '$cm/entities/index';
import { cmIDB } from '$cm/shared/state';
import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { atom, useAtomValue } from 'atomaric';
import { memo, useEffect, useState } from 'react';
import { CmComWid, ICmComCommentBlock, SokiAuthLogin } from 'shared/api';
import { toast } from 'sonner';

const isModalOpenAtom = atom(false);

export const CmComCommentSharePull = memo(function CmComCommentSharePull({
  shareProps,
}: {
  shareProps: {
    login: SokiAuthLogin;
    comw: CmComWid;
  };
}) {
  const com = useCmCom(shareProps.comw);
  const [altKeyFrom, setAltKeyFrom] = useState<string | nil>(undefined);
  const [altKeyTo, setAltKeyTo] = useState<string | nil>(undefined);
  const myAltKeys = useAtomValue(cmComCommentRegisteredAltKeysAtom);
  const navigate = useNavigate();

  cmComCommentRegisteredAltKeysAtom.do.init();

  const query = useQuery({
    queryKey: ['shareComCommentData', shareProps],
    enabled: () => !!(shareProps.comw && shareProps.login),
    queryFn: () => cmTsjrpcClient.pullUserAltCommentBlock(shareProps),
  });

  useEffect(() => {
    const timeout = setTimeout(() => isModalOpenAtom.set(true), 100);
    return () => {
      isModalOpenAtom.reset();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Modal openAtom={isModalOpenAtom}>
      <ModalHeader>
        С вами делятся комментариями к песне "
        <span className="text-x7">{com?.name ?? <span className="color-xKO"> Неизвестной песне</span>}</span>"
      </ModalHeader>
      <ModalBody>
        {query.isLoading ? (
          <Skeleton className="w-[70cqw] h-[70px] m-auto" />
        ) : (
          <>
            <div>Входящие заметки</div>
            <Dropdown<string | null>
              id={altKeyFrom}
              onSelectId={setAltKeyFrom}
              items={[
                { id: null, title: <span className="text-x7">Общ</span> },
                ...mylib.keys(query.data?.alt ?? {}).map(id => ({ id, title: id })),
              ]}
            />
            <div>Вместо ваших заметок</div>
            <Dropdown<string | null>
              id={altKeyTo}
              onSelectId={setAltKeyTo}
              items={[
                { id: null, title: <span className="text-x7">Общ</span> },
                ...Array.from(myAltKeys).map(id => ({ id, title: id })),
              ]}
            />
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          icon="CloudDownload"
          disabled={altKeyTo === undefined || altKeyFrom === undefined}
          disabledReason='Выберите "откуда" и "куда" вставлять заметки'
          onClick={async () => {
            const fromBlock = altKeyFrom == null ? query.data?.d : query.data?.alt?.[altKeyFrom];

            if (!fromBlock) return;
            cmComShareComCommentPropsAtom.reset();
            cmComCommentAltKeyAtom.set(altKeyTo ?? null);

            const newCommentBlock: ICmComCommentBlock = { comw: shareProps.comw, m: Date.now() };

            if (altKeyTo == null) {
              newCommentBlock.d = fromBlock;
            } else {
              newCommentBlock.alt ??= {};
              newCommentBlock.alt[altKeyTo] = fromBlock;
            }

            await cmIDB.tb.localComCommentBlocks.put(newCommentBlock);

            toast('Заметки успешно заменены');
            navigate({ to: '/cm/i', search: { comw: shareProps.comw } });
          }}
        >
          Заменить мои заметки
        </Button>
      </ModalFooter>
    </Modal>
  );
});
