const dnsLabelRegExp = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;

/**
 * Единственная точка парсинга опционального поддомена: приводит значение
 * к нижнему регистру, обрезает пробелы и проверяет формат DNS-метки.
 * Отсутствующее значение (undefined/null/пустая строка/пробелы) → undefined.
 * Некорректный набор символов → исключение, чтобы не пропустить опасные значения
 * в shell-команды certbot и пути к сертификатам.
 */
export const makeSubHost = (host: string, subdomain?: unknown): string | undefined => {
  if (typeof subdomain !== 'string') return undefined;

  const cleanSubdomain = subdomain.trim().toLowerCase();

  if (!cleanSubdomain) return undefined;

  if (!dnsLabelRegExp.test(cleanSubdomain)) {
    throw `Некорректный поддомен "${subdomain}": ожидается DNS-метка вида [a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?`;
  }

  return `${cleanSubdomain}.${host}`;
};
