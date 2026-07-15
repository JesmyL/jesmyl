import { useInvocatedValue } from '#basis/lib/useInvocatedValue';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComFaceList } from '$cm/ext';
import { useMemo } from 'react';
import { CmComWid, ScheduleWidgetDayi, ScheduleWidgetWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { checkIsNaN } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';

type Props = {
  dayi: ScheduleWidgetDayi;
  schw: ScheduleWidgetWid;
};

export const CmEditorMeetingEventEditsHistoryStatisticModalInner = ({ dayi, schw }: Props) => {
  const [{ comwCount, totalCount } = {}, isLoading, error] = useInvocatedValue(
    undefined,
    async ({ aborter }, initialValue) => {
      if (checkIsNaN(schw) || checkIsNaN(dayi)) return initialValue;
      return cmEditComExternalsClientTsjrpcMethods.getSchEvHistoryStatistic({ schw, dayi }, { aborter });
    },
    [schw, dayi],
  );

  const comws = useMemo(() => {
    if (comwCount == null) return [];

    return objectKeys(comwCount)
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
          <CmComFaceList
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
