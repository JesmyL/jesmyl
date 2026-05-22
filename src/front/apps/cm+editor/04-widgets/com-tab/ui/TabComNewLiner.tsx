import { Button } from '#shared/components';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComOrder } from '$cm/ext';
import React, { useMemo } from 'react';

export const CmEditorComTabComNewLiner = ({ ccom }: { ccom: EditableCom }) => {
  const lineGroups = useMemo(() => ccom.makeExpandGroupedLines(), [ccom]);

  const renderBreakButton = (
    configSet: Set<number>,
    ord: CmComOrder,
    linei: number,
    wordi: number,
    isNeedHr?: boolean,
  ) => (
    <>
      {(configSet.has(-wordi) || isNeedHr) && (
        <div className={`my-3 h-1 ${configSet.has(-wordi) && isNeedHr ? 'bg-xKO' : 'bg-x2'}`} />
      )}
      <Button
        size="sx"
        {...(configSet.has(-wordi)
          ? { icon: 'MinusSignCircle', className: 'text-xKO' }
          : { icon: 'PlusSignCircle', className: 'text-xOK' })}
        onClick={() =>
          cmEditComClientTsjrpcMethods.switchNewlinerBr({
            comw: ccom.wid,
            linei,
            wordi,
            ordw: ord.wid,
          })
        }
      />
    </>
  );

  return (
    <>
      <div className="absolute left-12 top-30 h-full w-53 bg-x2 opacity-25 z-0" />
      {lineGroups.map((group, groupi) => (
        <div
          key={groupi}
          className="mt-20"
        >
          {group?.map(({ line, ord, ordLinei }, ordBlocki) => {
            const { watchOrdConfigSet, configSet, watchOrd } = ccom.makeNewlinerSet(ord, ordLinei);

            return (
              <div
                key={ordBlocki}
                className="mt-5"
              >
                {ord.isRealText() && renderBreakButton(configSet, ord, ordLinei, 1, !ordBlocki)}
                {line.split(' ').map((word, initWordi) => {
                  if (!initWordi)
                    return (
                      <Button
                        key={initWordi}
                        size="sx"
                        icon="Play"
                        className={`bg-x2! text-x7! has-[>svg]:px-0! px-0!${watchOrdConfigSet ? '' : ' opacity-50!'}`}
                        onClick={() =>
                          watchOrd &&
                          cmEditComClientTsjrpcMethods.pullNewlinerLineConfig({
                            comw: ccom.wid,
                            linei: ordLinei,
                            ordw: ord.wid,
                            watchOrdw: watchOrd.wid,
                          })
                        }
                      >
                        <span dangerouslySetInnerHTML={{ __html: word || '??' }} />
                      </Button>
                    );

                  const wordi = initWordi + 1;
                  const isHasAbsWordi = configSet.has(wordi) || configSet.has(-wordi);

                  return (
                    <React.Fragment key={wordi}>
                      {isHasAbsWordi && (
                        <>
                          <br />
                          {renderBreakButton(configSet, ord, ordLinei, wordi)}
                        </>
                      )}
                      <Button
                        size="sx"
                        icon={isHasAbsWordi ? 'SquareArrowMoveLeftUp' : 'SquareArrowMoveDownLeft'}
                        className={`has-[>svg]:px-0! px-0!${isHasAbsWordi ? ` bg-x7! text-x1!${watchOrdConfigSet ? ' opacity-50!' : ''}` : ''}`}
                        onClick={() =>
                          cmEditComClientTsjrpcMethods.switchNewlinerWord({
                            comw: ccom.wid,
                            linei: ordLinei,
                            wordi,
                            ordw: ord.wid,
                          })
                        }
                      >
                        <span dangerouslySetInnerHTML={{ __html: word }} />
                      </Button>
                    </React.Fragment>
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};
