import { makeRegExp } from 'regexpert';

export const validEmailRegExp = makeRegExp('/^[^@+]+@[^.]+\\.[^.]+$/');
