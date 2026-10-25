import { CmCat } from 'shared/const/cm/Cat';
import { takeCmAdditionalCategory } from 'shared/const/cm/additionalCategories';

export const takeCmCatAdditional = (catw: number | nil) => {
  const cat = takeCmAdditionalCategory(catw);

  return cat && CmCat.fromAdditional(cat);
};
