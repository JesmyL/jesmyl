import { mylib } from '#shared/lib/my-lib';
import { storagesComputeFormula } from '$storages/shared/lib/formulaComputing';
import { StoragesRack, StoragesRackSummary, StoragesRackSummaryType } from 'shared/model/storages/list.model';
import { StoragesColumnType, StoragesRackColumn } from 'shared/model/storages/rack.model';
import { smylib } from 'shared/utils';

export const storagesRackSumComputeFormulas = (summary: StoragesRackSummary, rack: StoragesRack) => {
  let sum = 0;
  let filterByDate: (timestamp: number) => boolean;

  switch (summary.type) {
    case StoragesRackSummaryType.Total:
      filterByDate = () => false;
      break;
    case StoragesRackSummaryType.ByMonth:
      {
        const summaryMonth = new Date(summary.date * 100000).getMonth();
        const summaryYear = new Date(summary.date * 100000).getFullYear();

        filterByDate = timestamp => {
          const date = new Date(timestamp * 100000);

          return date.getMonth() !== summaryMonth || date.getFullYear() !== summaryYear;
        };
      }
      break;
    case StoragesRackSummaryType.ByYear:
      {
        const summaryYear = new Date(summary.date * 100000).getFullYear();
        filterByDate = timestamp => new Date(timestamp * 100000).getFullYear() !== summaryYear;
      }
      break;
  }

  for (const card of rack.cards) {
    const result = storagesComputeFormula(
      {
        cells: card.row,
        cols: rack.cols,
        formula: summary.formula,
        resultFix: 10,
        onNestedColi: (coli, nestedColi) => {
          const column = rack.cols[coli];
          const nestedColumn = column.cols?.[nestedColi] as StoragesRackColumn<StoragesColumnType.Formula> | nil;

          if (nestedColumn == null) return 0;

          return (
            card.row?.reduce((sum, cell) => {
              if (mylib.isObj(cell?.[1]) && cell[1].nst) {
                return (
                  sum +
                  cell[1].nst.reduce((sum, rowItem) => {
                    if (rowItem.ts == null || filterByDate(rowItem.ts)) return sum;

                    const nestedCell = rowItem.row[nestedColi];
                    if (nestedCell?.[0] === StoragesColumnType.Number) return sum + nestedCell[1];
                    if (
                      nestedCell?.[0] === StoragesColumnType.Formula &&
                      nestedColumn.t === StoragesColumnType.Formula
                    ) {
                      const result = storagesComputeFormula(
                        {
                          cells: card.row,
                          cols: column.cols,
                          formula: nestedColumn.val,
                          onNestedColi: retSero,
                          resultFix: nestedColumn.fx,
                          funcPrefix: undefined,
                        },
                        -20,
                      );

                      if (smylib.isNum(result)) return sum + result;

                      return sum;
                    }

                    return sum;
                  }, 0)
                );
              }

              return sum;
            }, 0) ?? 0
          );
        },
      },
      0,
    );

    if (mylib.isStr(result)) return result;

    sum += result;
  }

  return sum;
};
const retSero = () => 0;
