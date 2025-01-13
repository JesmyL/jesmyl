import { Link, Route, Routes } from 'react-router-dom';
import BrutalItem from '../../../../complect/brutal-item/BrutalItem';
import { IconArrangeTwotoneRounded } from '../../../../complect/the-icon/icons/arrange';
import { IconBookOpen01TwotoneRounded } from '../../../../complect/the-icon/icons/book-open-01';
import { IconCalendar02TwotoneRounded } from '../../../../complect/the-icon/icons/calendar-02';
import { IconHeadphonesTwotoneRounded } from '../../../../complect/the-icon/icons/headphones';
import { IconMusicNote01TwotoneRounded } from '../../../../complect/the-icon/icons/music-note-01';
import { IconTextTwotoneRounded } from '../../../../complect/the-icon/icons/text';
import { useAuth } from '../../../index/molecules';
import ChordRedactor from './chord-redactor/ChordRedactor';
import { cmEditorSokiInvocatorBaseClient } from './cm-editor-invocator.base';
import EditCategories from './col/categories/EditCategories';
import EditCompositions from './col/compositions/EditCompositions';
import './Editor.scss';
import EERules from './ee-rules/EERules';
import EditMeetings from './meetings/EditMeetings';
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
                  <Link to="cats">
                    <BrutalItem
                      icon={<IconBookOpen01TwotoneRounded />}
                      title="Категории"
                    />
                  </Link>
                )}
                <Link to="coms">
                  <BrutalItem
                    icon={<IconHeadphonesTwotoneRounded />}
                    title="Песни"
                  />
                </Link>
                {auth.level > 49 && (
                  <>
                    <Link to="events">
                      <BrutalItem
                        icon={<IconCalendar02TwotoneRounded />}
                        title="События"
                      />
                    </Link>
                    <Link to="chord">
                      <BrutalItem
                        icon={<IconArrangeTwotoneRounded />}
                        title="Редактор аккордов"
                      />
                    </Link>
                    {auth.level > 79 && (
                      <>
                        <Link to="mp3Rules">
                          <BrutalItem
                            icon={<IconMusicNote01TwotoneRounded />}
                            title="Редактор MP3 правил"
                          />
                        </Link>
                        <Link to="e-e">
                          <BrutalItem
                            icon={<IconTextTwotoneRounded />}
                            title="Ё-Е правила"
                          />
                        </Link>
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
            element={<EditMeetings />}
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
