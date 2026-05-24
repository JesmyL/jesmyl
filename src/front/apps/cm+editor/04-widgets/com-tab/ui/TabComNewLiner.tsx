import { Button } from '#shared/components';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import React, { useMemo } from 'react';

export const CmEditorComTabComNewLiner = ({ ccom }: { ccom: EditableCom }) => {
  const lineGroups = useMemo(() => ccom.makeExpandGroupedLines(), [ccom]);

  return (
    <>
      <div className="absolute pointers-none left-12 top-30 h-full w-53 bg-x2 opacity-25 z-0" />
      {lineGroups.map((group, groupi) => (
        <div
          key={groupi}
          className="mt-20"
        >
          {group?.map(({ line, ord, ordLinei, selfLinei }, ordBlocki) => {
            if (!ord.isRealText()) return line;

            const { watchSet, currentSet, nearSet, selfSet } = ccom.makeNewlinerSet(ord, ordLinei, selfLinei);
            const isSelf = !!selfSet.size;
            const isDifferentDigitsWithNear = !nearSet || !!nearSet.symmetricDifference(selfSet).size;

            const renderBreakButton = (wordi: number, isNeedHr?: boolean) => (
              <>
                {(currentSet.has(-wordi) || isNeedHr) && (
                  <div className={`my-3 h-1 ${currentSet.has(-wordi) && isNeedHr ? 'bg-xKO' : 'bg-x2'}`} />
                )}
                <Button
                  size="sx"
                  {...(currentSet.has(-wordi) && !watchSet
                    ? { icon: 'MinusSignCircle', className: isDifferentDigitsWithNear ? 'text-x6' : 'bg-xKO! text-x6' }
                    : {
                        icon: 'PlusSignCircle',
                        className: isDifferentDigitsWithNear ? 'text-xOK' : 'bg-xKO! text-x6',
                      })}
                  onClick={() =>
                    cmEditComClientTsjrpcMethods.switchNewlinerBr({
                      comw: ccom.wid,
                      ordw: ord.wid,
                      ordLinei,
                      selfLinei,
                      wordi,
                    })
                  }
                />
              </>
            );

            return (
              <div
                key={ordBlocki}
                className="mt-5"
              >
                {renderBreakButton(1, !ordBlocki)}

                {line.split(' ').map((word, initWordi) => {
                  if (!initWordi)
                    return (
                      <Button
                        key={initWordi}
                        size="sx"
                        className={`bg-x2! text-x7! has-[>svg]:px-0! px-0!`}
                        {...(isSelf
                          ? {
                              icon: 'Delete01',
                              onClick: () =>
                                cmEditComClientTsjrpcMethods.removeNewliner({
                                  comw: ccom.wid,
                                  linei: selfLinei,
                                  ordw: ord.wid,
                                }),
                            }
                          : { icon: 'Play' })}
                      >
                        <span dangerouslySetInnerHTML={{ __html: word }} />
                      </Button>
                    );

                  const wordi = initWordi + 1;
                  const isHasAbsWordi = currentSet.has(wordi) || currentSet.has(-wordi);

                  return (
                    <React.Fragment key={wordi}>
                      {isHasAbsWordi && (
                        <>
                          <br />
                          {renderBreakButton(wordi)}
                        </>
                      )}
                      <Button
                        size="sx"
                        icon={isHasAbsWordi ? 'SquareArrowMoveLeftUp' : 'SquareArrowMoveDownLeft'}
                        className={`has-[>svg]:px-0! px-0! ${isHasAbsWordi ? `${isDifferentDigitsWithNear ? 'bg-x7! text-x1!' : 'bg-xKO! text-x6!'}${isSelf ? '' : ' opacity-50!'}` : ''}`}
                        onClick={() =>
                          cmEditComClientTsjrpcMethods.switchNewlinerWord({
                            comw: ccom.wid,
                            linei: selfLinei,
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
