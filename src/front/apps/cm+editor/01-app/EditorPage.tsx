import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { PageCmEditorContainer } from '$cm+editor/shared/ui/PageCmEditorContainer';
import { Link } from '@tanstack/react-router';

export const CmEditorPage = () => {
  const checkAccess = useCheckUserAccessRightsInScope();

  return (
    <PageCmEditorContainer
      className="cm-editor"
      withoutBackButton
      headTitle={translateBase(it => it.cm.li.admin)}
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
                title={translateBase(it => it.cm.coms)}
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
                title={translateBase(it => it.events)}
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
                title={translateBase(it => it.cm.chs)}
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
                title="MP3"
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
                title="Ё-Е правила"
                idPostfix="e-e"
              />
            </Link>
          )}
        </>
      }
    />
  );
};
