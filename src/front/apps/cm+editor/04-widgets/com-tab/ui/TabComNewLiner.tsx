import { Button } from '#shared/components';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import React, { useMemo } from 'react';

export const CmEditorComTabComBroadcast = ({ ccom }: { ccom: EditableCom }) => {
  const lineGroups = useMemo(() => ccom.makeExpandGroupedLines(), [ccom]);

  return (
    <>
      <div className="absolute pointers-none left-12 top-30 h-full w-53 bg-x2 opacity-25 z-0" />
      {lineGroups.map((group, groupi) => (
        <div
          key={groupi}
          className="mt-20"
        >
          {group?.map(({ line, ord, linei, repeati }, ordBlocki) => {
            if (!ord.isRealText() || !line.trim()) return line;

            const { watchSet, currentSet, nearSet, ownSet } = ccom.makeNewlinerSet(ord, repeati, linei);
            const isHasSelfChanges = !!ownSet.size;
            const isDifferentDigitsWithNear = !nearSet || !!nearSet.symmetricDifference(ownSet).size;

            const renderBreakButton = (wordi: number, isNeedHr?: boolean) => (
              <>
                {(currentSet.has(-wordi) || isNeedHr) && (
                  <div className={`my-3 h-1 ${currentSet.has(-wordi) && isNeedHr ? 'bg-xKO' : 'bg-x2'}`} />
                )}
                <Button
                  size="sx"
                  {...(currentSet.has(-wordi) && !watchSet.size
                    ? { icon: 'MinusSignCircle', className: isDifferentDigitsWithNear ? 'text-x6' : 'bg-xKO! text-x6' }
                    : {
                        icon: 'PlusSignCircle',
                        className: isDifferentDigitsWithNear ? 'text-xOK' : 'bg-xKO! text-x6',
                      })}
                  onClick={() =>
                    cmEditComClientTsjrpcMethods.switchNLBr({
                      comw: ccom.wid,
                      ordw: ord.wid,
                      repeati,
                      linei,
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
                {!linei && (
                  <div>
                    {ord.me.header()}
                    {ord.me.kind?.isInherit && '+'}
                  </div>
                )}
                {renderBreakButton(1, !ordBlocki)}

                {line.split(' ').map((word, initWordi) => {
                  if (!initWordi)
                    return (
                      <Button
                        key={initWordi}
                        size="sx"
                        className={`${isHasSelfChanges ? 'text-x8! underline' : 'text-x7!'} bg-x2! has-[>svg]:px-0! px-0!`}
                        {...(isHasSelfChanges
                          ? {
                              icon: 'Delete01',
                              onClick: () =>
                                cmEditComClientTsjrpcMethods.removeNL({
                                  comw: ccom.wid,
                                  ordw: ord.wid,
                                  linei,
                                  repeati,
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
                        className={`has-[>svg]:px-0! px-0! ${isHasAbsWordi ? `${isDifferentDigitsWithNear ? 'bg-x7! text-x1!' : 'bg-xKO! text-x6!'}${isHasSelfChanges ? '' : ' opacity-50!'}` : ''}`}
                        onClick={() =>
                          cmEditComClientTsjrpcMethods.switchNLWord({
                            comw: ccom.wid,
                            linei,
                            repeati,
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
