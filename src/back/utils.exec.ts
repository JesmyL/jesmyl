import { exec } from 'child_process';
import fs from 'fs';
import { checkIsObject } from 'shared/utils/checkIs';
import { promisify } from 'util';

const execPromise = promisify(exec);

const mk = (num: number) => `\x1b[${num}m`;
const resetAll = mk(0);
const nl = '\n';

export const makeRedLogText = (text: string, endl = nl) => `${mk(31)}${text}${resetAll}${endl}`;
export const makeGreenLogText = (text: string, endl = nl) => `${mk(32)}${text}${resetAll}${endl}`;
export const makeYellowLogText = (text: string, endl = nl) => `${mk(33)}${text}${resetAll}${endl}`;
export const makeCyanLogText = (text: string, endl = nl) => `${mk(36)}${text}${resetAll}${endl}`;
export const makeGreenLogTextBg = (text: string, endl = nl) => `${mk(30)}${mk(42)}${text}${resetAll}${endl}`;

export const runCommand = async (command: string, description?: string, options = {}) => {
  description ||= command;
  console.info(makeCyanLogText(`[RUN COMMAND] ${description}`));

  try {
    const { stdout, stderr } = await execPromise(command, { timeout: 300000, ...options });
    if (stdout) console.info(stdout);
    if (stderr && !stderr.includes('WARNING')) console.warn(makeYellowLogText(`[Предупреждение] ${stderr}`));
    console.info(makeGreenLogText(`[Успешно] ${description}`));
  } catch (error) {
    console.error(makeRedLogText(`[Ошибка]: ${description}`));
    console.error(checkIsObject(error) && error.message);
    throw error;
  }
};

export const rewriteAndDo = async (
  path: string,
  newContent: string,
  doOnChanged?: () => Promise<unknown> | unknown,
) => {
  let content = '';
  try {
    content = fs.readFileSync(path, 'utf-8');
  } catch {
    //
  }

  if (content.trim() !== newContent.trim()) {
    console.info(makeYellowLogText(`Содержимое файла ${path} было изменено`));
    fs.writeFileSync(path, newContent.trimStart());
    await doOnChanged?.();
  }
};
