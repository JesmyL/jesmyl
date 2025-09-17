import { useInvocatedValue } from '#basis/lib/useInvocatedValue';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { useMemo } from 'react';
import { CmComWid, IScheduleWidgetWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';

type Props = {
  dayi: number;
  schw: IScheduleWidgetWid;
};

export const CmMeetingEventEditsHistoryStatisticModalInner = ({ dayi, schw }: Props) => {
  const [{ comwCount, totalCount } = {}, isLoading, error] = useInvocatedValue(
    undefined,
    async ({ aborter }, initialValue) => {
      if (mylib.isNaN(schw) || mylib.isNaN(dayi)) return initialValue;
      return cmEditComExternalsClientTsjrpcMethods.getScheduleEventHistoryStatistic({ schw, dayi }, { aborter });
    },
    [schw, dayi],
  );

  const comws = useMemo(() => {
    if (comwCount == null) return [];

    return MyLib.keys(comwCount)
      .sort((a, b) => comwCount[b] - comwCount[a])
      .map(comwStr => +comwStr as CmComWid);
  }, [comwCount]);

  return (
    <>
      <ModalHeader className="flex justify-between">
        <span className="flex gap-2">
          <LazyIcon icon="TradeUp" />
          Статистика использования
        </span>
        <span>{totalCount}</span>
      </ModalHeader>
      {isLoading ? (
        <ModalBody>
          <div className="flex center full-size m-2">{isLoading}</div>
        </ModalBody>
      ) : comwCount == null || error ? (
        <ModalBody>
          <div className="flex center full-size text-xKO">{error ? `${error}` : 'Ошибка'}</div>
        </ModalBody>
      ) : (
        <ModalBody>
          <ComFaceList
            list={comws}
            isPutCcomFaceOff
            importantOnClick={emptyFunc}
            comDescription={com => <span className="nowrap">{comwCount[com.wid]}</span>}
          />
        </ModalBody>
      )}
    </>
  );
};
