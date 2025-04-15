import { MyLib } from '#shared/lib/my-lib';

export const translationPushKinds = [
  // +цифра в ключе - меньше или равно количество реальных строк
  // -цифра в ключе - ровное количество реальных строк
  // 0 в ключе - все остальные значения

  // +цифра в значении - разбиение на количество строк
  // +цифра > 9 - сначала количество по первой цифре, остальные по последней (43 === 433333...)
  // -цифра > 9 - повторение схемы каждый шаг (43 === 43434343434343...)
  // 0 в значении - остаётся прежнее количество строк
  {
    6: 6,
    8: 4,
    10: 5,
    0: 4,
  },
  {
    0: 0,
  },
  {
    5: 5,
    '-6': 3,
    8: 35,
    0: 4,
  },
  {
    6: 6,
    8: 4,
    10: 46,
    0: 4,
  },
  {
    3: 21,
    0: 2,
  },
  {
    3: 3,
    5: 23,
    7: 23,
    9: 23,
    11: 23,
    0: 2,
  },
].map(rule => {
  const rules = MyLib.entries(rule)
    .map(([key, val]) => [+key, val])
    .sort(([a], [b]) =>
      a === undefined || a === 0 ? 1 : b === undefined || b === 0 ? -1 : Math.abs(a) - Math.abs(b) || a - b,
    );
  const list: number[] = [];
  const push = (num: number) => list.push(num) + 1;

  return {
    title: rules
      .map(([key, val]) =>
        key
          ? `${key < 0 ? `=${-key}` : key}:${val !== undefined && val < 0 ? `~${-val}` : val}`
          : `[${val !== undefined && val < 0 ? `~${-val}` : val}]`,
      )
      .join(','),
    clearList: () => {
      const prev = list.slice(0);
      list.length = 0;
      return prev;
    },
    list: () => list,
    push: (num: number) => {
      rules.some(([key, val]): number => {
        if (key === undefined || val === undefined || (key === 0 && val === 0)) return push(num);

        if (key && val > 0 && val < 10) {
          if (num <= key || -key === num) {
            if (num <= val) return push(num);
            else {
              let div = num;

              while (div >= val) {
                push(val);
                div -= val;
              }

              return div ? push(div) : 1;
            }
          }
        } else if (key === 0 || num <= key || -key === num) {
          const isNegative = val < 0;
          const nums = (isNegative ? -val : val)
            .toString()
            .split('')
            .map((v: string) => +v);
          let parti = 0;
          let div = num;

          while (div >= nums[parti]) {
            push(nums[parti]);
            div -= nums[parti];
            parti += nums.length - 1 === parti ? (isNegative ? -parti : 0) : 1;
          }

          return div ? push(div) : 1;
        }

        return 0;
      });
    },
  };
});
