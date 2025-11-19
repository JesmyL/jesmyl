import { DirStorage } from 'back/complect/DirStorage';
import { StoragesRack } from 'shared/model/storages/list.model';

export const storagesDirStore = new DirStorage({
  dirPath: '/apps/storages/list/',
  idKey: 'w',
  makeNewItem: (): StoragesRack => ({
    w: Date.now() + Math.random(),
    title: '',
    team: {},
    cards: [],
    statuses: [{ title: 'Новый' }],
    cols: [],
    dicts: [{ li: [''], title: 'База' }],
  }),
});

// storagesDirStore.getAllItems().forEach(rack => {
//   if (rack.dicts) return;
//   rack.dicts ??= [{ li: ['', ...rack.values], title: 'База' }];
//   const colDicti = {};

//   rack.cols.forEach((column, columni) => {
//     if (column.t !== StoragesColumnType.String && column.t !== StoragesColumnType.List) return;
//     if (columni === 8) {
//       column.t = StoragesColumnType.Text;
//       return;
//     }

//     (column as StoragesRackColumn<StoragesColumnType.String | StoragesColumnType.List>).di = colDicti[columni] =
//       rack.dicts.length;
//     rack.dicts.push({ li: [''], title: column.title });
//   });

//   rack.cards.forEach(card => {
//     card.row?.forEach((cell, celli) => {
//       if (cell == null) return;

//       if (cell.t === StoragesColumnType.String) {
//         if (celli === 8) {
//           cell.t = StoragesColumnType.Text;
//           return;
//         }

//         if (!smylib.isStr(cell.val)) return;
//         let index = rack.dicts[colDicti[celli]].li.indexOf(cell.val);
//         if (index < 0) index = rack.dicts[colDicti[celli]].li.push(cell.val) - 1;

//         cell.val = index;
//       }

//       if (cell.t === StoragesColumnType.List) {
//         if (!smylib.isStr(cell.val)) return;

//         cell.val = cell.val.map(title => {
//           let index = rack.dicts[colDicti[celli]].li.indexOf(title);
//           if (index < 0) index = rack.dicts[colDicti[celli]].li.push(title) - 1;

//           return index;
//         });
//       }
//     });
//   });

//   storagesDirStore.saveItem(rack.w);
// });
