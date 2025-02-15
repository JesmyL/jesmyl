import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { Route, Routes } from 'react-router-dom';
import BrutalItem from '../../../../complect/brutal-item/BrutalItem';
import { useAuth } from '../../../index/atoms';
import { TheMeetings } from '../lists/meetings/TheMeetings';
import ChordRedactor from './chord-redactor/ChordRedactor';
import { cmEditorSokiInvocatorBaseClient } from './cm-editor-invocator.base';
import EditCategories from './col/categories/EditCategories';
import EditCompositions from './col/compositions/EditCompositions';
import './Editor.scss';
import EERules from './ee-rules/EERules';
import Mp3RulesRedactor from './mp3-rule-redactor/Mp3RulesRedactor';
import PhaseCmEditorContainer from './phase-editor-container/PhaseCmEditorContainer';

export default function Editor() {
  const auth = useAuth();

  return (
    <Routes>
      <Route
        index
        element={
          <PhaseCmEditorContainer
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
        }
      />

      <Route
        path="coms/*"
        element={<EditCompositions />}
      />
      {auth.level > 49 && (
        <>
          <Route
            path="cats/*"
            element={<EditCategories />}
          />
          <Route
            path="events/*"
            element={<TheMeetings />}
          />
          <Route
            path="chord"
            element={<ChordRedactor />}
          />
          <Route
            path="mp3Rules"
            element={<Mp3RulesRedactor />}
          />
          <Route
            path="e-e"
            element={<EERules />}
          />
        </>
      )}
    </Routes>
  );
}

cmEditorSokiInvocatorBaseClient.$$register();
