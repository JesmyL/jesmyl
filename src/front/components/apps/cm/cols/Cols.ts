import { SourceBased } from '#shared/lib/SourceBased';
import { Cat } from '@cm/col/cat/Cat';
import { Com } from '@cm/col/com/Com';
import { IExportableCols, IExportableCom } from 'shared/api';
import { ICols } from './Cols.model';

export class Cols extends SourceBased<IExportableCols> implements ICols {
  coms: Com[] = [];
  cats: Cat[] = [];

  constructor(cols: IExportableCols, prevComs?: Com[]) {
    super(cols);

    if (prevComs) {
      this.coms = [...(cols?.coms || [])]
        .sort((a, b) => a.w - b.w)
        .map((com, comi) => {
          let top: IExportableCom = com;

          const comw = com.w;
          let prevCom;
          prevCom = prevComs.find(c => c.wid === comw);
          if (prevCom && prevCom.ton != null) {
            top = {
              ...com,
              ton: prevCom.ton,
            };
          }

          return new Com(top);
        });
    } else this.coms = [...(cols?.coms || [])].sort((a, b) => a.w - b.w).map((com, comi) => new Com(com));

    this.cats = [...(cols?.cats || [])].sort((a, b) => a.w - b.w).map(cat => new Cat(cat, this.coms));
  }
}
