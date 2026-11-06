import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { cmComChordsErrorDict } from 'shared/model/cm/chords';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { StyledLoadingSpinner } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComOrderLine, TheCmCom, TheCmComOrder, useCmComPinchFontSize } from '$cm/ext';
import React, { useEffect } from 'react';
import { makeRegExp } from 'regexpert';
import { CmComWid } from 'shared/api';
import { toast } from 'sonner';
import { useCmEditorComTabUpdateLinePositions } from '../lib/useUpdateChordLinePositions';
import { CmEditorComTabChordApplicationsStyledContent } from '../style/CmEditorTabComChordApplicationsStyledContent.styled';
import { CmEditorComTabChordHardLevelSelector } from '../sub-ui/ChordHardLevelSelector';

const toastedChordsErrorComwSet = new Set<CmComWid>();

export const CmEditorComTabChordApplications = ({ ccom }: { ccom: EditableCom }) => {
  const { updateLinePositions, linesOnUpdateSet, ordLinePositionsOnSend } = useCmEditorComTabUpdateLinePositions();
  const checkAccess = useCheckUserAccessRightsInScope();
  const { fontSize, ref } = useCmComPinchFontSize();
  const isAdmin = checkAccess('cm', 'COM_APPS', 'U');

  useEffect(() => {
    if (!isAdmin) return;

    const message = cmComChordsErrorDict[ccom.wid];

    if (!message || toastedChordsErrorComwSet.has(ccom.wid)) return;

    toast(message, makeToastKOMoodConfig());
    toastedChordsErrorComwSet.add(ccom.wid);
  }, [ccom.wid, isAdmin]);

  if (!isAdmin)
    return (
      <TheCmCom
        comw={ccom.wid}
        chordVisibleVariant={ChordVisibleVariant.Maximal}
        isMiniAnchor={false}
        listRef={ref}
        fontSize={fontSize}
      />
    );

  return (
    <CmEditorComTabChordApplicationsStyledContent
      id="chord-application-redactor"
      ref={ref}
      style={{ fontSize }}
    >
      <CmEditorComTabChordHardLevelSelector />
      {ccom.orders?.map((ord, ordi) => {
        if (!ord.isVisible) return;

        return (
          <React.Fragment key={ordi}>
            <TheCmComOrder
              ord={ord}
              ordi={ordi}
              chordVisibleVariant={ChordVisibleVariant.Maximal}
              com={ccom}
              asHeaderNode={({ node }) => (
                <div className="flex gap-2">
                  {node}
                  {!linesOnUpdateSet[ord.wid]?.size || <StyledLoadingSpinner icon="Loading03" />}
                </div>
              )}
              asLineNode={props => {
                const { com, line, linei } = props;
                const lineOnLoad = ordLinePositionsOnSend[`${ord.wid}/${linei}`];
                const linePositions = lineOnLoad ?? ord.positions?.[linei] ?? [];

                const { cutLine, diffCount } = ord.makeCutChordPositions(linePositions, line, linei);

                return (
                  <div>
                    <div
                      className={`binder pointer${linePositions?.includes(-1) ? ' active' : ''}`}
                      com-letter-chorded="pre"
                      onClick={() => updateLinePositions(ord, linei, -1)}
                    />
                    <CmComOrderLine
                      key={linei}
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
                          updateLinePositions(ord, linei, +letteriStr);
                        }
                      }}
                    />
                    <div
                      className={'binder pointer' + (linePositions?.includes(-2) ? ' active' : '')}
                      com-letter-chorded="post"
                      onClick={() => updateLinePositions(ord, linei, -2)}
                    />
                    {!diffCount ||
                      (cutLine ? (
                        <span
                          className={`ml-2 pointer text-xKO ${lineOnLoad ? ' disabled pointers-none' : ''}`}
                          onClick={() =>
                            cmEditComOrderClientTsjrpcMethods.setPositionsLine({
                              comw: com.wid,
                              ordw: ord.wid,
                              linei,
                              line: cutLine,
                              lineChangesText: line,
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
