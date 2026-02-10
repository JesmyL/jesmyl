import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { StyledLoadingSpinner } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { ChordVisibleVariant, CmComOrderLine, TheCmCom, TheCmComOrder } from '$cm/ext';
import React from 'react';
import { makeRegExp } from 'regexpert';
import { useCmEditorComTabUpdateLinePositions } from '../lib/useUpdateChordLinePositions';
import { CmEditorComTabChordApplicationsStyledContent } from '../style/CmEditorTabComChordApplicationsStyledContent.styled';

export const CmEditorComTabChordApplications = ({ ccom }: { ccom: EditableCom }) => {
  const { updateLinePositions, linesOnUpdateSet, ordLinePositionsOnSend } = useCmEditorComTabUpdateLinePositions();
  const checkAccess = useCheckUserAccessRightsInScope();

  if (!checkAccess('cm', 'COM_APPS', 'U'))
    return (
      <TheCmCom
        com={ccom}
        chordVisibleVariant={ChordVisibleVariant.Maximal}
        isMiniAnchor={false}
      />
    );

  return (
    <CmEditorComTabChordApplicationsStyledContent id="chord-application-redactor">
      {ccom.orders?.map((ord, ordi) => {
        if (!ord.isVisible) return null;

        return (
          <React.Fragment key={ordi}>
            <TheCmComOrder
              ord={ord}
              ordi={ordi}
              chordVisibleVariant={ChordVisibleVariant.Maximal}
              com={ccom}
              chordHardLevel={3}
              asHeaderComponent={({ headerNode }) => {
                return (
                  <div className="flex gap-2">
                    {headerNode}
                    {!linesOnUpdateSet[ord.wid]?.size || <StyledLoadingSpinner icon="Loading03" />}
                  </div>
                );
              }}
              asLineComponent={props => {
                const { com, textLine, textLinei } = props;
                const lineOnLoad = ordLinePositionsOnSend[`${ord.wid}/${textLinei}`];
                const linePositions = lineOnLoad ?? ord.positions?.[textLinei] ?? [];

                const { cutLine, diffCount } = ord.makeCutChordPositions(linePositions, textLine, textLinei);

                return (
                  <div>
                    <div
                      className={`binder pointer${linePositions?.includes(-1) ? ' active' : ''}`}
                      com-letter-chorded="pre"
                      onClick={() => updateLinePositions(ord, textLinei, -1)}
                    />
                    <CmComOrderLine
                      key={textLinei}
                      {...props}
                      chordedOrd
                      ord={ord}
                      positions={linePositions}
                      com={com}
                      ordi={ordi}
                      isJoinLetters={false}
                      onClick={async event => {
                        const letteriStr = (event.nativeEvent.composedPath() as (HTMLSpanElement | nil)[])
                          .find(span => span?.hasAttribute('com-letter-index'))
                          ?.getAttribute('com-letter-index');

                        if (letteriStr != null) {
                          updateLinePositions(ord, textLinei, +letteriStr);
                        }
                      }}
                    />
                    <div
                      className={'binder pointer' + (linePositions?.includes(-2) ? ' active' : '')}
                      com-letter-chorded="post"
                      onClick={() => updateLinePositions(ord, textLinei, -2)}
                    />
                    {!diffCount ||
                      (cutLine ? (
                        <span
                          className={`ml-2 pointer text-xKO ${lineOnLoad ? ' disabled pointers-none' : ''}`}
                          onClick={() =>
                            cmEditComOrderClientTsjrpcMethods.setPositionsLine({
                              comw: com.wid,
                              orderTitle: ord.me.header(),
                              ordw: ord.wid,
                              linei: textLinei,
                              line: cutLine,
                              lineChangesText: textLine,
                            })
                          }
                        >
                          {-diffCount}
                        </span>
                      ) : (
                        <span className="ml-2">{diffCount}</span>
                      ))}
                  </div>
                );
              }}
            />
            {(ord.positions?.length ?? 0) > ord.text.split(makeRegExp('/\n/')).length && (
              <TheIconButton
                icon="Cancel01"
                className="text-xKO"
                prefix={<div className="h-3 w-30 bg-xKO" />}
                onClick={() =>
                  cmEditComOrderClientTsjrpcMethods.trimOverPositions({
                    comw: ccom.wid,
                    orderTitle: ord.me.header({ isEdit: true }),
                    ordw: ord.wid,
                  })
                }
              />
            )}
          </React.Fragment>
        );
      })}
    </CmEditorComTabChordApplicationsStyledContent>
  );
};
