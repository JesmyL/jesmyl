import { mylib } from './MyLib';

describe('MyLib', () => {
  it('isEq', () => {
    const a = { a: '', b: 71237, n: undefined };
    const b = { a: '', b: 71237 };
    expect(mylib.isEq(a, b)).toBe(true);
  });

  it('clone', () => {
    const a = { a: { b: { c: { d: [':)'] } } } };
    const b = mylib.clone(a);

    expect(a.a.b.c.d === b.a.b.c.d).toBe(false);
    expect(mylib.isEq(a.a.b.c.d, b.a.b.c.d)).toBe(true);
  });

  it('stringTemplater:simple', () => {
    expect(mylib.stringTemplater('Просто \\$textWithDolar', {})).toBe('Просто $textWithDolar');
    expect(mylib.stringTemplater('Привет, $friend;!', { friend: 'Игорь' })).toBe('Привет, Игорь!');

    expect(mylib.stringTemplater('Пустые "$noValue" кавычки', { num: 8 })).toBe('Пустые "" кавычки');

    expect(mylib.stringTemplater('Тут ноль "$zero"', { zero: 0 })).toBe('Тут ноль "0"');
    expect(mylib.stringTemplater('Тут ноль "$zero?"', { zero: 0 })).toBe('Тут ноль ""');

    expect(mylib.stringTemplater('Тернарник "$ter?{{есть}{нет}}"', { ter: 5 })).toBe('Тернарник "есть"');
    expect(mylib.stringTemplater('Тернарник "$ter?{{есть}{нет}}"', { ter: 0 })).toBe('Тернарник "нет"');
    expect(mylib.stringTemplater('Тернарник "$ter??{{есть}{нет}}"', { ter: 0 })).toBe('Тернарник "есть"');
    expect(mylib.stringTemplater('Тернарник "$ter!{{есть}{нет}}"', { ter: 0 })).toBe('Тернарник "есть"');
    expect(mylib.stringTemplater('Тернарник "$ter!!{{есть}{нет}}"', { ter: 0 })).toBe('Тернарник "нет"');
    expect(mylib.stringTemplater('Тернарник "$ter{{есть}{нет}}"', { ter: 0 })).toBe('Тернарник "есть"');
  });

  it('stringTemplater:default functions', () => {
    expect(mylib.stringTemplater('Я люблю $switch{{$num}{1}{бaнaны}{2}{яблоки}{3}{апельсины}}!', { num: 2 })).toBe(
      'Я люблю яблоки!',
    );

    expect(mylib.stringTemplater('Лежит $num $declension{{$num}{яблоко}{яблока}{яблок}}))', { num: 8 })).toBe(
      'Лежит 8 яблок))',
    );
  });

  it('stringTemplater:custom functions', () => {
    expect(
      mylib.stringTemplater('Сумма $arg и $arg1 равна $sum{{$arg}{$arg1}}', {
        arg: 4,
        arg1: 3,
        sum: (first: number, second: number) => first + second,
      }),
    ).toBe('Сумма 4 и 3 равна 7');

    expect(
      mylib.stringTemplater('В городе есть $translate{{$shop}{##}} где можно купить $translate{{$gift}}', {
        gift: { txt: 'Подарок' },
        shop: { txt: 'Магазин' },
        translate: ({ txt }: { txt: string }, some?: string) => `${txt}${some ? ` (${some})` : ''}`,
      }),
    ).toBe('В городе есть Магазин (##) где можно купить Подарок');

    expect(
      mylib.stringTemplater('Тут строка "$write{{$sum игнор}}"', {
        sum: 50,
        write: (sum: number) => typeof sum,
      }),
    ).toBe('Тут строка "number"');

    expect(
      mylib.stringTemplater('Тут цифра $ret?{{$num}}', {
        num: 100,
        ret: (num: number) => num,
      }),
    ).toBe('Тут цифра 100');

    expect(
      mylib.stringTemplater('Тут пусто $ret?{{$num}}', {
        // num: 0,
        ret: (num: number) => num,
      }),
    ).toBe('Тут пусто ');

    expect(
      mylib.stringTemplater('Каскад ф-ций $fun{{$fun{{$fun{{$fun{{$fun{{$start}}}} }}}} }}', {
        start: 0,
        fun: (num: number) => num + 1,
      }),
    ).toBe('Каскад ф-ций 5');

    expect(
      mylib.stringTemplater('Ф-ция без аргов $func;123', {
        func: () => 'STRING',
      }),
    ).toBe('Ф-ция без аргов STRING123');

    expect(
      mylib.stringTemplater('$true || $funF;', {
        funF: () => 'F',
        true: true,
      }),
    ).toBe('true || F');

    expect(
      mylib.stringTemplater('$on && $tw', {
        on: () => true,
        tw: () => false,
      }),
    ).toBe('true && false');
  });
});

export {};
