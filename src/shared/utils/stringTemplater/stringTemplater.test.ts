import { AND, FN, IF, OR, STR, stringTemplater, SWITCH, toNUM, toSTR } from '.';
import { stringTemplaterSrartSymbolCharCode } from './const';

describe('stringTemplater', () => {
  it('simple', () => {
    expect(stringTemplater('Просто $;textWithDolar', {})).toBe('Просто $textWithDolar');
    expect(stringTemplater('Привет, $friend;!', { friend: 'Игорь' })).toBe('Привет, Игорь!');

    expect(stringTemplater('Пустые "$noValue" кавычки', { num: 8 })).toBe('Пустые "" кавычки');

    expect(stringTemplater('Тут ноль "$zero"', { zero: 0 })).toBe('Тут ноль "0"');
  });

  it('stringTemplater:default functions', () => {
    expect(stringTemplater('Я люблю $switch{{$num}{1}{бaнaны}{2}{яблоки}{3}{апельсины}}!', { num: 2 })).toBe(
      'Я люблю яблоки!',
    );

    expect(stringTemplater('Лежит $num $declension{{$num}{яблоко}{яблока}{яблок}}))', { num: 8 })).toBe(
      'Лежит 8 яблок))',
    );
  });

  it('stringTemplater:custom functions', () => {
    expect(
      stringTemplater('Сумма $arg и $arg1 равна $sum{{$arg}{$arg1}}', {
        arg: 4,
        arg1: 3,
        sum: (first: number, second: number) => first + second,
      }),
    ).toBe('Сумма 4 и 3 равна 7');

    expect(
      stringTemplater('В городе есть $translate{{$shop}{##}} где можно купить $translate{{$gift}}', {
        gift: { txt: 'Подарок' },
        shop: { txt: 'Магазин' },
        translate: ({ txt }: { txt: string }, some?: string) => `${txt}${some ? ` (${some})` : ''}`,
      }),
    ).toBe('В городе есть Магазин (##) где можно купить Подарок');

    expect(
      stringTemplater('Тут строка "$write{{$sum игнор}}"', {
        sum: 50,
        write: (sum: number) => typeof sum,
      }),
    ).toBe('Тут строка "string"');

    expect(
      stringTemplater('Тут цифра $ret{{$num}}', {
        num: 100,
        ret: (num: number) => num,
      }),
    ).toBe('Тут цифра 100');

    expect(
      stringTemplater('Тут пусто $ret{{$num}}', {
        // num: 0,
        ret: (num: number) => num,
      }),
    ).toBe('Тут пусто ');

    expect(
      stringTemplater('Каскад ф-ций $fun{{$fun{{$fun{{$fun{{$fun{{$start}}}}}}}}}}', {
        start: 0,
        fun: (num: number) => num + 1,
      }),
    ).toBe('Каскад ф-ций 5');

    expect(
      stringTemplater('Ф-ция без аргов $func;123', {
        func: () => 'STRING',
      }),
    ).toBe('Ф-ция без аргов STRING123');

    expect(
      stringTemplater('$true || $funF;', {
        funF: () => () => () => () => () => () => 'F',
        true: true,
      }),
    ).toBe(' || F');

    expect(
      stringTemplater('$on && $tw', {
        on: () => true,
        tw: () => false,
      }),
    ).toBe(' && ');

    expect(stringTemplater('$IF{{$cond}{0}{1}}', { cond: 0 })).toBe('1');

    expect(stringTemplater('$IF{{$cond}{0}{1}}', { cond: 1 })).toBe('0');

    expect(stringTemplater('$IF{{$cond}{}{1}}', { cond: 1 })).toBe('');

    expect(stringTemplater('$IF{{$cond}{$obj}}', { cond: 1, obj: {} })).toBe('');

    expect(stringTemplater('$IF{{$cond}{never}}', { cond: 0 })).toBe('');

    expect(stringTemplater('$cond{{}}', { cond: 0 }, () => 'not a func')).toBe('not a func');

    expect(stringTemplater('Hi$IF{{$cond}{$p$o;potam &}} Me', { cond: 1, p: 'pp', o: 'o' })).toBe('Hippopotam & Me');

    expect(stringTemplater('$IF{{$isEq{{$v1}{$v2}}}{eq}{not eq}}', { v1: 1, v2: 1 })).toBe('eq');
    expect(stringTemplater('$IF{{$isEq{{$v1}{$v2}}}{eq}{not eq}}', { v1: 1, v2: 2 })).toBe('not eq');

    expect(stringTemplater('$IF{{}{}{empty}}', {})).toBe('empty');
    expect(stringTemplater('100$;and', {})).toBe('100$and');

    let check = 0;

    stringTemplater('$IF{{$cond}{}{$noInvoke}}', {
      cond: 1,
      noInvoke: () => check++,
    });

    expect(check).toBe(0);
  });
});

const funcConcept = FN('$func');
let indexForCheck = 0;
const func = () => indexForCheck++;
const checkFunc = () => expect(indexForCheck).toBe(0);

describe('stringTemplater:concepts', () => {
  it('object, NaN', () => {
    const str = STR`ret nothing $fn $nan`;

    expect(
      stringTemplater(str, {
        nan: NaN,
        fn: () => ({ OBJ: 'OBJ' }),
      }),
    ).toBe('ret nothing  ');

    checkFunc();
  });

  it('required vars', () => {
    expect(() => {
      const _str = STR(['$req1'])`no $;req1 var`;
    }).toThrow();

    const _str = [
      STR(['$req1'])`no $req1 var`,
      STR(['$req1', '$req2'])`no $req1 var $req2`,
      STR(['$req1', '$req2'])`no $req2 var $req1`,
    ];
  });

  it('$-escaping', () => {
    expect(stringTemplater(STR(['$req1'])`$req1`, { req1: '$;var' })).toBe('$;var');
  });

  it('IF', () => {
    const str = STR`${IF('$o').THEN`TRUE_o`.ELSE`FALSE_o ${funcConcept}`}`;

    expect(stringTemplater(str, { o: '!!!', func })).toBe('TRUE_o');

    checkFunc();
  });

  it('AND', () => {
    const str = STR`ret-$;t ${AND('$o').AND('$t').AND(funcConcept)}`;

    expect(stringTemplater(str, { o: '!!!', t: 0, func })).toBe('ret-$t 0');

    checkFunc();
  });

  it('OR', () => {
    const str = STR`ret-$;t ${OR('$o').OR('$t').OR(funcConcept)}`;

    expect(stringTemplater(str, { o: '', t: 256, func })).toBe('ret-$t 256');

    checkFunc();
  });

  it('SWITCH-duplicate keys', () => {
    expect(() => {
      const _str = STR`${SWITCH('$cond').CASE('33')`$sw`.CASE('33')`SAME CASE_KEY`}`;
    }).toThrow();
  });

  it('SWITCH', () => {
    const str = STR`ret-$;sw ${SWITCH('$cond').CASE(FN('$inv'))`${FN('$noInv')}`.CASE('3')`$sw`.CASE('NO')`${funcConcept}`}`;

    let i = 0;

    expect(
      stringTemplater(str, {
        cond: '3',
        sw: 345,
        func,
        inv: () => {
          i++;
          return 'ANY_CASE';
        },
        noInv: () => {
          throw 'This Func Cant Be Invoke';
        },
      }),
    ).toBe('ret-$sw 345');

    checkFunc();
    expect(i).toBe(1);
  });

  it('SWITCH.DEFAULT', () => {
    const str = STR`ret-$;def ${SWITCH('$cond').CASE('@@')`${FN('$inv')}`.CASE('777')`$sw`.CASE('PoPuP')`${funcConcept}`.DEFAULT`$def`}`;

    expect(
      stringTemplater(str, {
        cond: 'WoW',
        def: 77.77,
        func,
        inv: () => {
          throw 'This Func Cant Be Invoke';
        },
      }),
    ).toBe('ret-$def 77.77');

    checkFunc();
  });

  it('SWITCH.DEFAULT', () => {
    const str = STR`ret-$;def ${SWITCH('$cond').CASE('@@')`${FN('$inv')}`.CASE('777')`$sw`.CASE('PoPuP')`${funcConcept}`.DEFAULT`$def`}`;

    expect(
      stringTemplater(str, {
        cond: 'WoW',
        def: 77.77,
        func,
        inv: () => {
          throw 'This Func Cant Be Invoke';
        },
      }),
    ).toBe('ret-$def 77.77');

    checkFunc();
  });

  it('FN', () => {
    const str = STR` ${FN('$sum', 3, 4, 5, 6)} `;

    expect(
      stringTemplater(str, {
        sum: (...args: number[]) => args.reduce((sum, curr) => +sum + +curr),
      }),
    ).toBe(' 18 ');
  });

  it('FN', () => {
    const str = STR` ${FN('$sum', 3, 4, 5, 6)} `;

    expect(
      stringTemplater(str, {
        sum: (...args: number[]) => args.reduce((sum, curr) => sum + curr),
      }),
    ).toBe(' 3456 ');
  });

  it('toSTR, toNUM', () => {
    const str = STR` ${FN('$sum', toNUM(3), toNUM(3))} ${toSTR('$obj')} ${toSTR('$NaN')} `;

    expect(
      stringTemplater(str, {
        sum: (...args: number[]) => args.reduce((sum, curr) => sum + curr),
        obj: { itIs: 'object' },
        NaN: NaN,
      }),
    ).toBe(' 6 {"itIs":"object"} null ');
  });

  it('unknown symbols', () => {
    const symbol = String.fromCharCode(stringTemplaterSrartSymbolCharCode);
    const symbol1 = String.fromCharCode(stringTemplaterSrartSymbolCharCode + 1);
    const symbol2 = String.fromCharCode(stringTemplaterSrartSymbolCharCode + 2);

    const str = STR` $symbol $symbol1 $symbol2 `;

    expect(stringTemplater(str, { symbol, symbol1, symbol2 })).toBe(` ${symbol} ${symbol1} ${symbol2} `);
  });
});
