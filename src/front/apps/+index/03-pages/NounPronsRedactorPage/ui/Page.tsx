import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { IndexNounPronsRedactorNounRedactor } from './NounRedactor';
import { IndexNounPronsRedactorPronRedactor } from './PronRedactor';

export const IndexNounPronsRedactorPage = () => {
  return (
    <PageContainerConfigurer
      className="index-access-rights"
      headTitle="Сущ/Прил"
      content={
        <>
          <IndexNounPronsRedactorNounRedactor />
          <IndexNounPronsRedactorPronRedactor />
        </>
      }
    />
  );
};
