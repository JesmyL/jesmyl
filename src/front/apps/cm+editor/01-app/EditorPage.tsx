import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { PageCmEditorContainer } from '$cm+editor/shared/ui/PageCmEditorContainer';
import { Link } from '@tanstack/react-router';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const CmEditorPage = () => {
  const checkAccess = useCheckUserAccessRightsInScope();

  return (
    <PageCmEditorContainer
      className="cm-editor"
      withoutBackButton
      headTitle={translateBase(BaseLocaleKey.CmListsAdmin)}
      content={
        <>
          {checkAccess('cm', 'COM') && (
            <Link to="/cm/edit/coms">
              <BrutalItem
                iconNode={
                  <LazyIcon
                    icon="MusicNote01"
                    kind="TwotoneRounded"
                  />
                }
                title={translateBase(BaseLocaleKey.CmComs)}
                idPostfix="coms"
              />
            </Link>
          )}
          {checkAccess('cm', 'EVENT', 'R') && (
            <Link to="/cm/edit/events">
              <BrutalItem
                iconNode={
                  <LazyIcon
                    icon="Calendar02"
                    kind="TwotoneRounded"
                  />
                }
                title={translateBase(BaseLocaleKey.Events)}
                idPostfix="events"
              />
            </Link>
          )}
          {checkAccess('cm', 'CHORD', 'R') && (
            <Link
              to="/cm/edit/chord"
              search={{ newChordName: '' }}
            >
              <BrutalItem
                iconNode={
                  <LazyIcon
                    icon="TwoFinger05"
                    kind="TwotoneRounded"
                  />
                }
                title={translateBase(BaseLocaleKey.CmChords)}
                idPostfix="chord"
              />
            </Link>
          )}
          {checkAccess('cm', 'MP3', 'R') && (
            <Link to="/cm/edit/mp3Rules">
              <BrutalItem
                iconNode={
                  <LazyIcon
                    icon="Mp302"
                    kind="TwotoneRounded"
                  />
                }
                title={translateBase(BaseLocaleKey.CmEditorMp3)}
                idPostfix="mp3Rules"
              />
            </Link>
          )}
          {checkAccess('cm', 'EE', 'R') && (
            <Link to="/cm/edit/e-e">
              <BrutalItem
                iconNode={
                  <LazyIcon
                    icon="Text"
                    kind="TwotoneRounded"
                  />
                }
                title={translateBase(BaseLocaleKey.CmEditorYoYeRules)}
                idPostfix="e-e"
              />
            </Link>
          )}
        </>
      }
    />
  );
};
