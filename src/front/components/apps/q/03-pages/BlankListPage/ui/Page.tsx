import { FaceItem } from '#basis/ui/FaceItem';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';
import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuestionerAdminBlanksQuery } from '../api/useQuestionerAdminBlanksQuery';
import { useQuestionerCreateBlankMutation } from '../api/useQuestionerCreateBlankMutation';

export const QuestionerBlankListPage = () => {
  const checkAccess = useCheckUserAccessRightsInScope();
  const [isOpenTools, setIsOpenTools] = useState(false);
  const navigate = useNavigate();
  const createBlankMutation = useQuestionerCreateBlankMutation();
  const blanksQuery = useQuestionerAdminBlanksQuery();

  return (
    <PageContainerConfigurer
      className="QuestionerRedactorPage"
      headTitle="Опросы"
      onMoreClick={setIsOpenTools}
      withoutBackButton
      content={
        <>
          {blanksQuery.data?.map(blank => {
            return (
              <Link
                key={blank.w}
                to="/q/r/$blank"
                params={{ blank: '' + blank.w }}
              >
                <FaceItem.Root>
                  <FaceItem.Logo>
                    <LazyIcon icon="Message01" />
                  </FaceItem.Logo>
                  <FaceItem.Title>{blank.title}</FaceItem.Title>
                </FaceItem.Root>
              </Link>
            );
          })}
          <BottomPopup
            open={isOpenTools}
            onClose={setIsOpenTools}
          >
            {checkAccess('q', 'EDIT', 'C') && (
              <BottomPopupItem
                icon="PlusSign"
                iconNode={createBlankMutation.isPending && <TheIconLoading />}
                title="Новый опрос"
                onClick={async event => {
                  event.stopPropagation();
                  const newBlank = await createBlankMutation.mutateAsync();

                  navigate({ to: '/q/r/$blank', params: { blank: '' + newBlank.w } });
                  setIsOpenTools(false);
                }}
              />
            )}
          </BottomPopup>
        </>
      }
    />
  );
};
