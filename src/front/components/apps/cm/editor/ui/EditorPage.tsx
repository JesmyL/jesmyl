import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAuth } from 'front/components/index/atoms';
import { PageCmEditorContainer } from './PhaseCmEditorContainer';

export const EditorPage = () => {
  const auth = useAuth();

  return (
    <PageCmEditorContainer
      className="cm-editor"
      withoutBackButton
      headTitle="Редактор"
      content={
        <>
          {auth.level === 100 && (
            <BrutalItem
              iconNode={
                <LazyIcon
                  icon="BookOpen01"
                  kind="TwotoneRounded"
                />
              }
              title="Категории"
              to="cats"
            />
          )}
          <BrutalItem
            iconNode={
              <LazyIcon
                icon="Headphones"
                kind="TwotoneRounded"
              />
            }
            title="Песни"
            to="coms"
          />
          {auth.level > 49 && (
            <>
              <BrutalItem
                iconNode={
                  <LazyIcon
                    icon="Calendar02"
                    kind="TwotoneRounded"
                  />
                }
                title="События"
                to="events"
              />
              <BrutalItem
                iconNode={
                  <LazyIcon
                    icon="Arrange"
                    kind="TwotoneRounded"
                  />
                }
                title="Редактор аккордов"
                to="chord"
              />
              {auth.level > 79 && (
                <>
                  <BrutalItem
                    iconNode={
                      <LazyIcon
                        icon="MusicNote01"
                        kind="TwotoneRounded"
                      />
                    }
                    title="Редактор MP3 правил"
                    to="mp3Rules"
                  />
                  <BrutalItem
                    iconNode={
                      <LazyIcon
                        icon="Text"
                        kind="TwotoneRounded"
                      />
                    }
                    title="Ё-Е правила"
                    to="e-e"
                  />
                </>
              )}
            </>
          )}
        </>
      }
    />
  );
};
