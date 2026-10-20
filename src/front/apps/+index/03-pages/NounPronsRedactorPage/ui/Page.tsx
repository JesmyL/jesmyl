import { translateBase } from '#basis/locale';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { IndexNounPronsRedactorNounRedactor } from './NounRedactor';
import { IndexNounPronsRedactorPronRedactor } from './PronRedactor';

export const IndexNounPronsRedactorPage = () => {
  return (
    <PageContainerConfigurer
      className="index-access-rights"
      headTitle={translateBase(BaseLocaleKey.IndexNounPronouns)}
      content={
        <>
          <IndexNounPronsRedactorNounRedactor />
          <IndexNounPronsRedactorPronRedactor />
        </>
      }
    />
  );
};
