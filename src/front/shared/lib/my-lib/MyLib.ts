import { makeRegExp } from 'regexpert';
import { SMyLib, itIt } from 'shared/utils';

const constants = {
  REMOVE: ['REMOVE'] as const,
  POSITION: ['POSITION'] as const,
  INDEX: ['INDEX'] as const,
};

type Trace = string | (typeof constants)[keyof typeof constants];

export type AddRestMode = 'strong' | 'weak' | 'random';

export class MyLib extends SMyLib {
  c = constants;

  monthFullTitles = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];
  dayFullTitles = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  dayShortTitles = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  typ<T>(...args: (T | null | undefined)[]): T {
    if (args[0] == null || args.length < 2) return args[0] as T;

    const type = this.typeOf(args[0]);
    const arg = args.find((arg, argi) => argi && this.typeOf(arg) === type);
    return arg == null ? args[0] : arg;
  }

  convertSecondsInStrTime(seconds: number) {
    return (
      Math.floor(seconds / 60)
        .toFixed(0)
        .padStart(2, '0') +
      ':' +
      Math.floor(seconds % 60)
        .toFixed(0)
        .padStart(2, '0')
    );
  }

  findLastIndex<Value>(arr?: Value[], cb: (val: Value, index: number, array: Value[]) => unknown = () => false) {
    if (!Array.isArray(arr)) return null;
    if (!this.isFunc(cb)) return arr.length - 1;

    for (let i = arr.length - 1; i >= 0; i--) if (cb(arr[i], i, arr)) return i;

    return -1;
  }

  numberSearchReplacements: [RegExp, string][] = [
    [/0/g, '[ 0]'],
    [/1/g, '[^а-яё1]'],
    [/2/g, '[абвг2]'],
    [/3/g, '[деёжз3]'],
    [/4/g, '[ийкл4]'],
    [/5/g, '[мноп5]'],
    [/6/g, '[рсту6]'],
    [/7/g, '[фхцч7]'],
    [/8/g, '[шщъы8]'],
    [/9/g, '[ьэюя9]'],
  ];

  textSearchReplacements: [RegExp, string][] = [
    [/[ыіi]/g, '[ыії]'],
    [/[ъ'ʼ]/g, "[ъ'ʼ]"],
    [/[эє]/g, '[эє]'],
    [/[гґ]/g, '[гґ]'],
    [/[её]/g, '[её]'],
  ];

  internationalWordReg(word: string, isNumberSearch?: boolean) {
    return makeRegExp(
      `/${(isNumberSearch ? this.numberSearchReplacements : this.textSearchReplacements)
        .reduce((acc, [from, to]) => acc.replace(from, to), word)
        .toLowerCase()}/`,
    );
  }

  searchRate<T, R extends { item: T; deep: number; rate: number; field: string }, RetItem extends R = R>(
    items: T[],
    searchWord: string,
    places: (Trace[] | Trace)[],
    isNumberSearch?: boolean,
  ): RetItem[] {
    const normalWords = isNumberSearch
      ? searchWord.split(makeRegExp('/0+/')).filter(itIt)
      : searchWord.split(makeRegExp("/[^а-яёa-z0-9ґї'ʼє]+/i")).filter(itIt);
    const words = normalWords.map(word => word.toLowerCase());
    const wordRegs = normalWords.map(word => this.internationalWordReg(word, isNumberSearch));

    return items.reduce((ferries: RetItem[], item, itemi) => {
      let rate = 0;
      let deep = 0;
      const ferry = (): RetItem => ({ item, deep, rate }) as never;

      if (
        places.some((place, placei) => {
          deep = placei;
          const num = ([this.c.INDEX, this.c.POSITION] as Trace[]).indexOf(place as never);
          if (num > -1) {
            if (
              words.some(word =>
                word && words.length > 1
                  ? (itemi + num).toString() === word
                  : (itemi + num).toString().startsWith(word),
              )
            ) {
              rate = 1;
              return true;
            }
            return false;
          }

          const searchInPlace = (str: string, level: number) => {
            str = str.toLowerCase();
            let noWord = false;

            const currRate = words.reduce((accRate: number | null, _word, wordi) => {
              if (noWord) return null;
              const index = str.search(wordRegs[wordi]);
              if (index < 0) {
                noWord = true;
                return null;
              }
              return (accRate as number) + index + level;
            }, null);

            if (noWord || currRate == null) return false;

            rate = currRate;
            return true;
          };

          const search = (track: Trace[] | Trace, target: unknown, level: number) => {
            let searched;
            ([] as Trace[]).concat(track).reduce((target, trace, tracei, tracea) => {
              if (!target) return null;
              if (trace === this.c.INDEX && this.isArr(target)) {
                searched = target.some((o: unknown) => search(track.slice(tracei + 1), o, (level + tracei) * 10));
                return null;
              }
              if (tracei >= tracea.length - 1)
                searched = searchInPlace((target as never as Record<string, string>)[trace as string], level);
              return (target as never as Record<string, string>)[trace as string];
            }, target);
            return searched;
          };

          return search(place, item, placei);
        })
      )
        ferries.push(ferry());

      return ferries;
    }, []);
  }

  searchRateWithSort<T, R extends { item: T; deep: number; rate: number; field: string }, RetItem extends R = R>(
    items: T[],
    searchWord: string,
    places: (Trace[] | Trace)[],
    isNumberSearch?: boolean,
  ): { list: Promise<RetItem[]>; reset: () => void } {
    const { promise, reject, resolve } = Promise.withResolvers<RetItem[]>();
    const reseter: { t: TimeOut } = { t: undefined };

    const result = this.searchRate<T, R, RetItem>(items, searchWord, places, isNumberSearch);

    setTimeout(() => {
      resolve(this.qsort(result, (a, b) => a.rate - b.rate, 3, reseter));
    }, 0);

    return {
      list: promise,
      reset: () => {
        reject();
        clearTimeout(reseter.t);
      },
    };
  }

  qsort<Item>(items: Item[], compareFn?: (a: Item, b: Item) => number, interval = 0, reseter?: { t: TimeOut }) {
    compareFn ??= (a, b) => (a > b ? 1 : a === b ? 0 : -1);
    reseter ??= { t: undefined };

    const sort = async (items: Item[]): Promise<Item[]> => {
      if (items.length < 2) return items;

      const { promise, resolve } = Promise.withResolvers<Item[]>();

      reseter.t = setTimeout(async () => {
        const less = [];
        const great = [];
        const pivot = items[0];
        const list = items.slice(1);

        for (const item of list)
          if (compareFn(item, pivot) < 1) less.push(item);
          else great.push(item);

        resolve((await sort(less)).concat(pivot, await sort(great)));
      }, interval);

      return promise;
    };

    return sort(items);
  }

  correctRegExp(str: string, flags = '', transformer?: (str: string, reps: number) => string) {
    let reps = 0;
    const string = str.replace(makeRegExp('/[[\\]\\\\$^*()+|?.<>{}]/g'), all => {
      reps++;
      return `\\${all}`;
    });
    return RegExp(this.isFunc(transformer) ? transformer(string, reps) : string, flags);
  }

  intervalToString(begin: number, end: number) {
    const diff = end - begin;
    const ms = this.getMilliseconds();

    if (diff > ms.inYear) return 'Больше года';
    if (diff > ms.inMonth) return 'Больше месяца';
    if (diff >= ms.inDay) {
      const days = Math.trunc(diff % ms.inDay) + 2;
      return `${days} ${this.declension(days, 'день', 'дня')}`;
    }

    return '';
  }

  insertAfter(elem: HTMLElement, refElem: HTMLElement) {
    return refElem.parentNode?.insertBefore(elem, refElem.nextSibling);
  }

  scrollToView(
    element: Element | null,
    position = 'center',
    props: {
      parent?: HTMLElement;
      force?: boolean;
      animationTime?: number;
      top?: number;
    } = {} as never,
  ) {
    if (!element) return;
    const { parent = element.parentElement, force = true, animationTime = 0, top = 0 } = props;

    if (!parent) return;

    const attrName = 'animation.ts';
    const attrVal = (Date.now() + Math.random()).toString();
    const is = (pos: RegExp | string) => ~(position || 'center').search(pos);
    const isStatic = getComputedStyle(parent).position === 'static';
    const prevPosition = parent.style.position;

    if (isStatic) {
      parent.style.position = 'relative';
    }

    parent.setAttribute(attrName, attrVal);

    const scroll = (posMode: 's' | 'c' | 'e' = 's', dir: 'v' | 'h' = 'v') => {
      const [pos, vol]: ['Top' | 'Left', 'Height' | 'Width'] = dir === 'v' ? ['Top', 'Height'] : ['Left', 'Width'];

      const parentScroll = parent[`scroll${pos}`];
      const parentVol = parent[`client${vol}`];
      const elemVol = element[`client${vol}`];
      const elemPos = (element as never)[`offset${pos}`];

      const end = elemPos - parentVol + elemVol;
      const center = elemPos - parentVol / 2 + elemVol / 2;

      const cleanPos = posMode === 's' ? elemPos : posMode === 'e' ? end : center;
      const newPos = cleanPos - (pos === 'Top' ? top : 0);

      if (force || parentScroll > elemPos || parentScroll + parentVol < elemPos + elemVol) {
        if (animationTime < 1) parent[`scroll${pos}`] = newPos;
        else {
          const diff = parent[`scroll${pos}`] - newPos;
          const time = Math.abs(animationTime / diff);
          const dir = diff > 0 ? -1 : 1;
          let last = 0;

          const step = (dec = 0) =>
            setTimeout(() => {
              const px = (parent[`scroll${pos}`] += dir) - dir;

              if (parent.getAttribute(attrName) === attrVal)
                if (dec < 5 && (dir > 0 ? px < newPos : px > newPos)) step(dec + (px !== last ? 0 : 1));

              last = px;
            }, time);

          step();
        }
      }
    };

    [
      [/left/i, /right/i, /top/i, /bottom/i, /center +-/i, 'h'] as const,
      [/top/i, /bottom/i, /left/i, /right/i, /- +center/i, 'v'] as const,
    ].forEach(([sReg, eReg, nsReg, neReg, ncReg, dir]) => {
      if (is(sReg)) scroll('s', dir);
      else if (is(eReg)) scroll('e', dir);
      else if (is(nsReg) || is(neReg) ? is(makeRegExp('/center/i')) : is(makeRegExp('/center/i')) && !is(ncReg))
        scroll('c', dir);
    });

    if (isStatic) parent.style.position = prevPosition;
  }

  unique<Item, Res>(arr: Item[], by: (f: Item) => Res) {
    const exclusives: Res[] = [];
    return arr.filter(item => (exclusives.indexOf(by(item)) === -1 ? exclusives.push(by(item)) : false));
  }

  static values<T extends object | [], R extends T extends Record<string, infer V> ? V : unknown>(obj: T | nil): R[] {
    return obj ? Object.values(obj) : [];
  }

  findMap<Item, Val, Def extends Val>(items: Item[], cb: (item: Item, index: number, items: Item[]) => Val, def?: Def) {
    for (let i = 0; i < items.length; i++) {
      const val = cb(items[i], i, items);
      if (val) return val;
    }
    return def as Def;
  }

  setInputHeightByContent(inputNode: HTMLInputElement | HTMLTextAreaElement) {
    inputNode.style.height = '1px';
    inputNode.style.transition = 'height .2s linear';
    inputNode.style.height = inputNode.scrollHeight ? `${inputNode.scrollHeight}px` : '1.5em';
  }

  groupByFieldsSoftly<Item, Fieldn extends keyof Item>(
    fieldns: (Fieldn | ((item: Item) => number))[],
    items: Item[],
    numOf: number,
    addRestMode: AddRestMode,
  ) {
    const lastFieldn = fieldns[fieldns.length - 1];
    const wraps = items
      .map(item => ({ item }))
      .sort(({ item: a }, { item: b }) => {
        return this.findMap(
          fieldns,
          (fieldn, fieldni, fieldna) => {
            const theA = typeof fieldn === 'function' ? fieldn(a) : a[fieldn as never];
            const theB = typeof fieldn === 'function' ? fieldn(b) : b[fieldn as never];

            return theA > theB ? -1 : theA < theB ? 1 : fieldni === fieldna.length - 1 ? this.randomOf(-1, 1) : 0;
          },
          0,
        );
      });
    const groups: Item[][] = this.netFromLine(wraps, numOf, ({ item }) => item);
    const teams: Item[][] = [];
    let rest: Item[] = [];

    for (let i = 0; i < numOf; i++) {
      const team: Item[] = [];
      teams.push(team);
      groups.forEach(group => {
        if (group.length === numOf) team.push(group[i]);
        else rest = group;
      });
    }

    const sorter: (a: number[], b: number[]) => number =
      addRestMode === 'strong'
        ? ([a], [b]) => b - a
        : addRestMode === 'weak'
          ? ([a], [b]) => a - b
          : () => this.randomOf(-1, 1);

    const map = teams
      .map((team, teami) => [team.reduce((rate, item) => rate + item[lastFieldn as never], 0), teami])
      .sort(sorter);

    rest.forEach((item, itemi) => {
      const [, index] = map[itemi];
      teams[index].push(item);
    });

    teams.sort(() => this.randomOf(-1, 1)).forEach(team => team.sort(() => this.randomOf(-1, 1)));

    return teams;
  }

  netFromLine<Item, FillItem>(line: Item[], cols: number, map: (item: Item, rowi: number, index: number) => FillItem) {
    if (cols < 2) return line.map((item, itemi) => [map(item, itemi, itemi)]);

    let lastRow: FillItem[] = [];
    const rows: FillItem[][] = [];
    let rowi = 0;

    line.forEach((item, itemi) => {
      if (!(itemi % cols)) {
        rows.push((lastRow = []));
        rowi++;
      }
      lastRow.push(map(item, rowi, itemi));
    });

    return rows;
  }

  findNext<Item>(items: Item[], item: Item, step = 1) {
    return items[(items.indexOf(item) + Math.abs(step)) % items.length];
  }

  nextCircularIndex(currentIndex: number, line: unknown[], dir: 1 | -1 = 1) {
    return dir < 0
      ? currentIndex <= 0
        ? line.length - 1
        : currentIndex - 1
      : currentIndex >= line.length - 1
        ? 0
        : currentIndex + 1;
  }

  onChildInViewPort(
    listNode: HTMLDivElement,
    isScrollingRef: { current: boolean },
    onResizeNum: (ink: (num: number) => number) => void,
    filterElements: (element: HTMLElement) => boolean,
    onElementEnterViewPort: (element: HTMLElement) => void,
  ) {
    const topsMap = new Map<number, HTMLElement>();
    let scrollTimeout: TimeOut;
    let isScrollingTimeout: TimeOut;
    let resizeDebounceTimeOut: TimeOut;

    (Array.from(listNode.children) as HTMLElement[]).forEach(child => {
      if (filterElements(child)) topsMap.set(child.offsetTop, child);
    });
    const tops = Array.from(topsMap.keys());
    let isResizing = false;

    return hookEffectLine()
      .addEventListener(window, 'resize', () => {
        isResizing = true;
        clearTimeout(resizeDebounceTimeOut);
        resizeDebounceTimeOut = setTimeout(() => {
          isResizing = false;
          onResizeNum(num => num + 1);
        }, 100);
      })
      .addEventListener(listNode, 'scroll', () => {
        if (isResizing) return;

        isScrollingRef.current = true;
        clearTimeout(isScrollingTimeout);
        isScrollingTimeout = setTimeout(() => (isScrollingRef.current = false), 300);

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          let start = 0;
          let end = tops.length - 1;
          const scrollTop = listNode.scrollTop;

          if (scrollTop < 0) {
            if (topsMap.has(0)) onElementEnterViewPort(topsMap.get(0)!);

            return;
          } else if (scrollTop >= tops[end] - 50) {
            const top = topsMap.get(tops[end]);

            if (top === undefined) return;
            onElementEnterViewPort(top);

            return;
          }

          while (start <= end) {
            const middle = Math.floor((start + end) / 2);

            if (
              (tops[middle] <= scrollTop && tops[middle + 1] >= scrollTop) ||
              (tops[middle] >= scrollTop && tops[middle + 1] <= scrollTop)
            ) {
              const top = topsMap.get(tops[middle]);

              if (top === undefined) return;

              onElementEnterViewPort(top);
              break;
            } else if (tops[middle] < scrollTop) start = middle + 1;
            else end = middle - 1;
          }
        }, 10);
      })
      .effect();
  }

  makeMaxMinReqInfo = (props: {
    min: number | nil;
    max: number | nil;
    isRequired: boolean;
    length: number;
    infoBetweenText: string;
    checkBetweenText: string;
    infoEqText: string;
    checkEqText: string;
    checkMinText: string;
    infoMinText: string;
    checkMaxText: string;
    infoMaxText: string;
    checkRequiredText: string;
  }): { check: string | null; info: null | string } => {
    if (props.min != null && props.max != null) {
      const info = props.max === props.min ? props.infoEqText : props.infoBetweenText;
      const check = props.max === props.min ? props.checkEqText : props.checkBetweenText;

      if (props.isRequired && !props.length) return { check, info };
      else if (!props.isRequired && !props.length) return { check: null, info };

      return {
        info,
        check:
          props.max === props.min
            ? props.length === props.min
              ? null
              : check
            : props.length < props.min || props.length > props.max
              ? check
              : null,
      };
    } else if (props.min != null) {
      return {
        info: props.infoMinText,
        check:
          props.isRequired && !props.length ? props.checkMinText : props.length < props.min ? props.checkMinText : null,
      };
    } else if (props.max != null) {
      return {
        info: props.infoMaxText,
        check:
          props.isRequired && !props.length
            ? props.checkRequiredText
            : props.length > props.max
              ? props.checkMaxText
              : null,
      };
    }

    if (props.isRequired && !props.length)
      return {
        check: props.checkRequiredText,
        info: null,
      };

    return { check: null, info: null };
  };
}

export const mylib = new MyLib();

if (typeof window !== 'undefined') {
  const win: { MyLib: unknown; mylib: unknown } = window as never;

  win.MyLib = MyLib;
  win.mylib = mylib;
}
