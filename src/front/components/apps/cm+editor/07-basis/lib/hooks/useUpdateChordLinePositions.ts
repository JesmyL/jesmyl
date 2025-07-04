import { cmEditComOrderClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { Order } from '$cm/col/com/order/Order';
import { useState } from 'react';
import { CmComOrderWid } from 'shared/api';

const timeouts: PRecord<`${CmComOrderWid}/${number}`, TimeOut> = {};

export const useUpdateLinePositions = () => {
  const [ordLinePositionsOnSend, setLinePositionsOnSend] = useState<PRecord<`${CmComOrderWid}/${number}`, number[]>>(
    {},
  );
  const [linesOnUpdateSet, setLinesOnUpdateSet] = useState<PRecord<CmComOrderWid, Set<number>>>({});

  const updateLinePositions = (ord: Order, linei: number, pos: number) => {
    const key = `${ord.wid}/${linei}` as const;
    const line = [...(ordLinePositionsOnSend[key] ?? ord.positions?.[linei] ?? [])];

    if (line.includes(pos)) line.splice(line.indexOf(pos), 1);
    else line.push(pos);

    line.sort((a, b) => a - b);

    setLinePositionsOnSend(prev => ({ ...prev, [key]: line }));
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
        await cmEditComOrderClientInvocatorMethods.setPositionsLine({
          comw: ord.com.wid,
          orderTitle: ord.me.header(),
          ordw: ord.wid,
          linei,
          line,
          lineChangesText: textLines[linei],
        });
      } catch (_e) {
        //
      }

      delete timeouts[key];
      setLinePositionsOnSend(prev => {
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

  return { updateLinePositions, ordLinePositionsOnSend, linesOnUpdateSet };
};
