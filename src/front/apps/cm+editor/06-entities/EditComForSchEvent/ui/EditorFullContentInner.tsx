import { Button } from '#shared/components';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useEditableCcom } from '$cm+editor/shared/lib/useEditableCom';
import { ChordVisibleVariant, cmIDB, TheCmComOrder } from '$cm/ext';
import { indexIDB } from '$index/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { CmComOrderWid, CmComWid, IScheduleWidgetWid } from 'shared/api';

export const CmEditorEditComForSchEventFullContentInner = ({
  comw,
  schw,
  linkNode,
}: {
  comw: CmComWid;
  schw: IScheduleWidgetWid;
  linkNode: React.ReactNode;
}) => {
  const schPack = useLiveQuery(() => cmIDB.tb.scheduleComPacks.get(schw), [schw]);
  const com = useEditableCcom(comw ?? CmComWid.def);
  const schedule = useLiveQuery(() => indexIDB.db.schs.get(schw), [schw]);
  const comInterpretation = schPack?.intp?.[comw];

  return (
    <>
      <div className="my-3 max-w-[calc(100vw-80px)]">
        Редактирование интерпритации для мероприятия
        <span className="text-x7"> {schedule?.title}</span>
      </div>
      {linkNode}

      {com?.orders?.map((ord, ordi) => {
        const isInvisible =
          comInterpretation?.o?.[ord.wid]?.v === 0 ||
          comInterpretation?.o?.[ord.me.leadOrd?.wid ?? CmComOrderWid.never]?.v === 0;

        return (
          <div
            key={ord.wid}
            className={isInvisible ? 'opacity-40' : undefined}
          >
            <TheCmComOrder
              ord={ord}
              ordi={ordi}
              com={com}
              chordVisibleVariant={ChordVisibleVariant.Maximal}
              asHeaderComponent={({ headerNode, ord }) => {
                if (ord.me.isInherit) return headerNode;

                return (
                  <div className="flex gap-3">
                    {headerNode}
                    <Button
                      icon={isInvisible ? 'ViewOff' : 'View'}
                      onClick={() =>
                        cmEditComExternalsClientTsjrpcMethods.switchComOrdVisiblityInterpretation({
                          comw,
                          ordw: ord.wid,
                          schw,
                        })
                      }
                    />
                  </div>
                );
              }}
            />
          </div>
        );
      })}
    </>
  );
};
