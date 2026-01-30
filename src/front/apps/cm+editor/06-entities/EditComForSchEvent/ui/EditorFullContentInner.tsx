import { Button } from '#shared/components';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useEditableCcom } from '$cm+editor/shared/lib/useEditableCom';
import { ChordVisibleVariant, cmIDB, TheCmComOrder } from '$cm/ext';
import { indexIDB } from '$index/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { CmComWid, IScheduleWidgetWid } from 'shared/api';

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
  const ordsInterpretation = schPack?.intp?.[comw]?.o;

  return (
    <>
      <div className="my-3 max-w-[calc(100vw-80px)]">
        Редактирование интерпритации для мероприятия
        <span className="text-x7"> {schedule?.title}</span>
      </div>
      {linkNode}

      {com?.orders?.map((ord, ordi) => {
        const visibleValue = ord.me.leadOrd
          ? ordsInterpretation?.[ord.me.leadOrd.wid]?.v
          : ordsInterpretation?.[ord.wid]?.v;

        const isInvisible = visibleValue === 1 ? false : visibleValue === 0 || !ord.isVisible;

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
              showInvisibles
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
                          isOrdInvisible: !ord.isVisible,
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
