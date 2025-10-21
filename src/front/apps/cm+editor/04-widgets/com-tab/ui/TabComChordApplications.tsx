import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { StyledLoadingSpinner } from '#shared/ui/the-icon/IconLoading';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { ChordVisibleVariant, CmComOrderLine, TheCmCom, TheCmComOrder } from '$cm/ext';
import React from 'react';
import { makeRegExp } from 'regexpert';
import { emptyArray, itIt } from 'shared/utils';
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
        const chords = ord.chords?.split('\n').map(line => line.split(' '));

        return (
          <React.Fragment key={ordi}>
            <TheCmComOrder
              ord={ord}
              ordi={ordi}
              chordVisibleVariant={ChordVisibleVariant.Maximal}
              com={ccom}
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
                const linePositions =
                  ordLinePositionsOnSend[`${ord.wid}/${textLinei}`] ?? ord.positions?.[textLinei] ?? emptyArray;
                const diffCount = (chords[textLinei]?.filter(itIt).length || 0) - (linePositions?.length || 0);

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
                        const letteriStr = (event.nativeEvent.composedPath() as HTMLSpanElement[])
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
                    {!diffCount || (
                      <span
                        className={'ml-2' + (diffCount < 0 ? ' pointer text-xKO' : '')}
                        onClick={() => ord.cutChordPositions(textLine, textLinei)}
                      >
                        {diffCount}
                      </span>
                    )}
                  </div>
                );
              }}
            />
            {(ord.positions?.length ?? 0) > ord.text.split(makeRegExp('/\n/')).length && (
              <TheIconButton
                icon="Cancel01"
                className="text-xKO"
                prefix={<div className="h-3 w-30 bg-xKO" />}
                onClick={() => ord.trimOverPositions()}
              />
            )}
          </React.Fragment>
        );
      })}
    </CmEditorComTabChordApplicationsStyledContent>
  );
};
