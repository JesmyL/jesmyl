import { translateBase } from '#basis/locale';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const CmComCommentForExample = ({ children }: { children: React.ReactNode }) => (
  <i className="text-x7 my-2">
    <br />
    {translateBase(BaseLocaleKey.ForExample)}:
    <br />
    {children}
  </i>
);
