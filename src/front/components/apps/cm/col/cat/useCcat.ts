import { useParams } from 'react-router-dom';
import { CmCatWid } from '../../../../../../back/apps/cm/Cm.enums';
import mylib from '../../../../../complect/my-lib/MyLib';
import { useCols } from '../../cols/useCols';
import { Cat } from './Cat';

export function useCcat(isTakeZeroCat?: boolean): Cat | nil {
  const cols = useCols();
  const params = useParams();

  if (isTakeZeroCat) return cols?.cats.find(cat => CmCatWid.zero === cat.wid);

  const catw = +params.catw! as CmCatWid | NaN;
  if (mylib.isNaN(catw)) return undefined;

  return cols?.cats.find(cat => catw === cat.wid);
}
