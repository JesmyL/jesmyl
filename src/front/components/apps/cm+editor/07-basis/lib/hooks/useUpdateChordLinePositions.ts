import { cmComOrderClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { Order } from '$cm/col/com/order/Order';
import { useState } from 'react';
import { CmComOrderWid } from 'shared/api';

const timeouts: PRecord<`${CmComOrderWid}/${number}`, TimeOut> = {};

export const useUpdateLinePositions = () => {
  const [ordLinePositions, setLinePositions] = useState<PRecord<`${CmComOrderWid}/${number}`, number[]>>({});
  const [linesOnUpdateSet, setLinesOnUpdateSet] = useState<PRecord<CmComOrderWid, Set<number>>>({});

  const updateLinePositions = (ord: Order, linei: number, pos: number) => {
    const key = `${ord.wid}/${linei}` as const;
    const line = [...(ordLinePositions[key] ?? ord.positions?.[linei] ?? [])];

    if (line.includes(pos)) line.splice(line.indexOf(pos), 1);
    else line.push(pos);

    line.sort((a, b) => a - b);

    setLinePositions(prev => ({ ...prev, [key]: line }));
    setLinesOnUpdateSet(prev => {
      const news = { ...prev };
      news[ord.wid] ??= new Set();
      news[ord.wid]?.add(linei);
      return news;
    });

    const textLines = (ord.text || '').split('\n');

    clearTimeout(timeouts[key]);
    timeouts[key] = setTimeout(async () => {
      try {
        await cmComOrderClientInvocatorMethods.setPositionsLine(
          null,
          ord.com.wid,
          ord.me.header(),
          ord.wid,
          linei,
          line,
          textLines[linei],
        );
      } catch (_e) {
        //
      }

      delete timeouts[key];
      setLinePositions(prev => {
        const linePositions = { ...prev };
        delete linePositions[key];
        return linePositions;
      });
      setLinesOnUpdateSet(prev => {
        const news = { ...prev };
        news[ord.wid] ??= new Set();
        news[ord.wid]?.delete(linei);
        return news;
      });
    }, 5000);
  };

  return { updateLinePositions, ordLinePositions, linesOnUpdateSet };
};
