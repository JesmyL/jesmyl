import { checkIsEq } from './checkIsEq';
import { deepClone } from './clone';
import { stringTemplater } from './stringTemplater';

describe('utils', () => {
  it('checkIsEq', () => {
    const a = { a: '', b: 71237, n: undefined };
    const b = { a: '', b: 71237 };
    expect(checkIsEq(a, b)).toBe(true);
  });

  it('deepClone', () => {
    const a = { a: { b: { c: { d: [':)'] } } } };
    const b = deepClone(a);

    expect(a.a.b.c.d === b.a.b.c.d).toBe(false);
    expect(checkIsEq(a.a.b.c.d, b.a.b.c.d)).toBe(true);
  });

  it('stringTemplater:simple', () => {
    expect(stringTemplater('Просто \\$textWithDolar', {})).toBe('Просто $textWithDolar');
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

    expect(stringTemplater('$if{{$cond}{0}{1}}', { cond: 0 })).toBe('1');

    expect(stringTemplater('$if{{$cond}{0}{1}}', { cond: 1 })).toBe('0');

    expect(stringTemplater('$if{{$cond}{}{1}}', { cond: 1 })).toBe('');

    expect(stringTemplater('$if{{$cond}{$obj}}', { cond: 1, obj: {} })).toBe('');

    expect(stringTemplater('$if{{$cond}{never}}', { cond: 0 })).toBe('');

    expect(stringTemplater('$cond{{}}', { cond: 0 }, () => 'not a func')).toBe('not a func');

    expect(stringTemplater('Hi$if{{$cond}{$p$o;potam &}} Me', { cond: 1, p: 'pp', o: 'o' })).toBe('Hippopotam & Me');

    let check = 0;

    stringTemplater('$if{{$cond}{}{$noInvoke}}', {
      cond: 1,
      noInvoke: () => check++,
    });

    expect(check).toBe(0);
  });
});

export {};
