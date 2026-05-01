export const fixComCommentOverLines = () => {
  // // const id = 'T166cbf17596a0c2919e4df1a6d54e66';
  // type LS = { len: number; next: CmComOrderWid | nil };
  // const comOrdLineLengths: PRecord<CmComWid, PRecord<CmComOrderWid, LS>> = {};
  // const ordsDict: PRecord<CmComWid, CmComOrderWidClass<any>[] | nil> = {};
  // // SMyLib.entries(comCommentsDirStore.getItem(id)?.b ?? {});
  // comCommentsDirStore.getAllItems().forEach(({ b, l: id, fio }) => {
  //   // if (id !== 'T166cbf17596a0c2919e4df1a6d54e66') return;
  //   SMyLib.entries(b).forEach(([comwStr, block]) => {
  //     // if (comwStr != (1710060142345 as CmComWid)) return;
  //     const icom = comsDirStore.getItem(+comwStr);
  //     if (!icom?.t) return;
  //     const ords = (ordsDict[comwStr] ??= orderListConstructor(
  //       me => new CmComOrderWidClass(me),
  //       icom.o?.map(ord => ({ header: () => '', top: ord })) ?? [],
  //       {},
  //       0,
  //     ));
  //     const comTexts = icom.t;
  //     let isChanged = true;
  //     const parseBlock = (block: CmComCommentBlockDict): CmComCommentBlockDict => {
  //       const codesBlock = {};
  //       const { k, ...ordComments } = block;
  //       const comls = (comOrdLineLengths[comwStr] ??= {});
  //       const chordsHolder = {};
  //       SMyLib.entries(ordComments).forEach(([selector, comments]: [CmComCommentBlockSimpleSelector, string[]]) => {
  //         const ordProps: CmComCommentTextDetectorRuleProps[] = [];
  //         if (selector === CmComCommentBlockSpecialSelector.Head) {
  //           cmComCommentTextRulesDetector(false, selector, comments, props => ordProps.push(props));
  //         } else {
  //           selector = +selector;
  //           let isCountDownLinei = true;
  //           const ordls = (comls[selector] ??= { len: 0, next: null }) as LS;
  //           if (!ordls.len) {
  //             const ordi = ords?.findIndex(o => o.wid == selector) ?? -1;
  //             const ord = ords?.[ordi];
  //             if (ord?.top.t != null) ordls.len = comTexts[ord.top.t].split('\n').length;
  //             else {
  //               isCountDownLinei = false;
  //             }
  //             const nextOrd = ords?.[ordi + 1];
  //             ordls.next = nextOrd && cmComOrderPlusKindSet.has(nextOrd.top.k!) ? nextOrd.wid : null;
  //           }
  //           cmComCommentTextRulesDetector(false, selector, comments, props => ordProps.push(props));
  //           if (isCountDownLinei) {
  //             const propsWithOverLens = ordProps.filter(
  //               prop => 'linei' in prop && prop.linei < 50 && prop.linei > ordls.len - 1,
  //             );
  //             // if (propsWithOverLens.length) {
  //             //   isChanged = true;
  //             // }
  //             propsWithOverLens.forEach(it => {
  //               if (ordls.next != null) {
  //                 it.sel = ordls.next;
  //                 if ('linei' in it) it.linei -= ordls.len;
  //               }
  //             });
  //           }
  //         }
  //         ordProps.forEach(props => {
  //           fillCmComCommentConstructorCommentInKey2PropsDict(selector, codesBlock, props, chordsHolder);
  //         });
  //       });
  //       const txt = makeCmComCommentConstructorCommentOrdSelector2TextsDictFromRuleProps(
  //         false,
  //         codesBlock,
  //         chordsHolder,
  //       );
  //       return txt;
  //     };
  //     let i = 20;
  //     let isWasChanged = false;
  //     while (isChanged) {
  //       isChanged = false;
  //       if (i-- < 0) {
  //         console.info({ fio, name: icom.n, comw: icom.w, id, err: 'LIMIT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' });
  //         break;
  //       }
  //       if (block?.alt) {
  //         SMyLib.entries(block.alt).forEach(([key, it]) => {
  //           if (it) {
  //             const prev = JSON.stringify(it);
  //             const res = parseBlock(it);
  //             const curr = JSON.stringify(res);
  //             if (curr.length === 2) delete block.alt![key];
  //             else if (curr !== prev) {
  //               isChanged = true;
  //               res.k = it.k;
  //               block.alt![key] = res;
  //               block.m = Date.now();
  //             }
  //             if (!smylib.keys(block.alt).length) delete block.alt;
  //           }
  //         });
  //       }
  //       if (block?.d) {
  //         const prev = JSON.stringify(block.d);
  //         const res = parseBlock(block.d);
  //         const curr = JSON.stringify(res);
  //         if (curr.length === 2) delete block.d;
  //         else if (curr !== prev) {
  //           isChanged = true;
  //           res.k = block.d.k;
  //           block.d = res;
  //           block.m = Date.now();
  //         }
  //       }
  //       isWasChanged ||= isChanged;
  //     }
  //     if (isWasChanged) {
  //       console.info({ fio, name: icom.n });
  //       const prev = comCommentsDirStore.getItem(id);
  //       comCommentsDirStore.saveItem(id as never, { ...prev, b: { ...prev?.b, [comwStr]: block }, l: id as never });
  //     }
  //   });
  // });
};
