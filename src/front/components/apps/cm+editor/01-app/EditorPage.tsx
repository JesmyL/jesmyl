import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { PageCmEditorContainer } from '$cm+editor/basis/ui/PageCmEditorContainer';
import { cmEditorInitialInvokes } from '$cm+editor/processes/cm+editor-initial-invokes';
import { Link } from '@tanstack/react-router';
import { useAuth } from 'front/components/index/atoms';

export const CmEditorPage = () => {
  const auth = useAuth();

  return (
    <PageCmEditorContainer
      className="cm-editor"
      withoutBackButton
      headTitle="Редактор"
      content={
        <>
          {auth.level === 100 && (
            <Link to="/cm/edit/cats">
              <BrutalItem
                iconNode={
                  <LazyIcon
                    icon="BookOpen01"
                    kind="TwotoneRounded"
                  />
                }
                title="Категории"
                idPostfix="cats"
              />
            </Link>
          )}
          <Link to="/cm/edit/coms">
            <BrutalItem
              iconNode={
                <LazyIcon
                  icon="Headphones"
                  kind="TwotoneRounded"
                />
              }
              title="Песни"
              idPostfix="coms"
            />
          </Link>
          {auth.level > 49 && (
            <>
              <Link to="/cm/edit/events">
                <BrutalItem
                  iconNode={
                    <LazyIcon
                      icon="Calendar02"
                      kind="TwotoneRounded"
                    />
                  }
                  title="События"
                  idPostfix="events"
                />
              </Link>
              <Link
                to="/cm/edit/chord"
                search={{ newChordName: '' }}
              >
                <BrutalItem
                  iconNode={
                    <LazyIcon
                      icon="Arrange"
                      kind="TwotoneRounded"
                    />
                  }
                  title="Редактор аккордов"
                  idPostfix="chord"
                />
              </Link>
              {auth.level > 79 && (
                <>
                  <Link to="/cm/edit/mp3Rules">
                    <BrutalItem
                      iconNode={
                        <LazyIcon
                          icon="MusicNote01"
                          kind="TwotoneRounded"
                        />
                      }
                      title="Редактор MP3 правил"
                      idPostfix="mp3Rules"
                    />
                  </Link>
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
                </>
              )}
            </>
          )}
        </>
      }
    />
  );
};

cmEditorInitialInvokes();
