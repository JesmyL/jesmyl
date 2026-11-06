import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import type { Plugin } from 'vite';

type EnumMemberValues = Map<string, string>;
type EnumInfo = { file: string; values: EnumMemberValues; mtimeMs: number };
type Edit = { start: number; end: number; text: string };

const ignoredDirectoryNames = new Set(['node_modules', '.git', 'build']);
const tsFileRegExp = /\.tsx?$/;

const isConstEnum = (node: ts.Node): node is ts.EnumDeclaration =>
  ts.isEnumDeclaration(node) && (node.modifiers?.some(({ kind }) => kind === ts.SyntaxKind.ConstKeyword) ?? false);

const readEnumValues = (declaration: ts.EnumDeclaration, source: ts.SourceFile, file: string) => {
  const values: EnumMemberValues = new Map();
  let autoValue = 0;

  for (const member of declaration.members) {
    const initializer = member.initializer;
    let literal: string;

    if (!initializer) {
      literal = `${autoValue}`;
    } else if (ts.isNumericLiteral(initializer)) {
      literal = `${Number(initializer.text)}`;
    } else if (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) {
      literal = JSON.stringify(initializer.text);
    } else if (
      ts.isPrefixUnaryExpression(initializer) &&
      initializer.operator === ts.SyntaxKind.MinusToken &&
      ts.isNumericLiteral(initializer.operand)
    ) {
      literal = `${-Number(initializer.operand.text)}`;
    } else {
      const line = source.getLineAndCharacterOfPosition(initializer.getStart(source)).line + 1;
      throw `[const-enum] Unsupported initializer of ${declaration.name.text}.${member.name.getText(source)} in ${file}:${line}`;
    }

    values.set(member.name.getText(source), literal);
    autoValue = Number(literal) + 1;
  }

  return values;
};

const readFileEnums = (file: string) => {
  const code = fs.readFileSync(file, 'utf8');
  if (!code.includes('const enum')) return null;

  const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, false);
  const enums = new Map<string, EnumMemberValues>();
  const visit = (node: ts.Node) => {
    if (isConstEnum(node)) enums.set(node.name.text, readEnumValues(node, source, file));
    ts.forEachChild(node, visit);
  };

  visit(source);

  return enums;
};

const collectEnums = (root: string) => {
  const enums = new Map<string, EnumInfo>();
  const files = new Set<string>();

  const scanFile = (file: string) => {
    const fileEnums = readFileEnums(file);
    if (!fileEnums) return;

    files.add(file);

    const mtimeMs = fs.statSync(file).mtimeMs;

    fileEnums.forEach((values, name) => enums.set(name, { file, values, mtimeMs }));
  };

  const scanDirectory = (directory: string) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!ignoredDirectoryNames.has(entry.name)) scanDirectory(path.join(directory, entry.name));
      } else if (tsFileRegExp.test(entry.name) && !entry.name.endsWith('.d.ts')) {
        scanFile(path.join(directory, entry.name));
      }
    }
  };

  scanDirectory(path.join(root, 'src'));

  return { enums, files };
};

const takeEnumMemberLiteral = (
  enums: Map<string, EnumInfo>,
  refreshedFiles: Set<string>,
  name: string,
  member: string,
) => {
  const info = enums.get(name);
  if (!info) return;

  // The snapshot is collected once per dev server, while an enum file may be edited afterwards.
  // A changed value, unlike an added member, is not a miss: the declaring file is re-read once
  // per transform as soon as its mtime moves.
  if (!refreshedFiles.has(info.file)) {
    refreshedFiles.add(info.file);

    try {
      const mtimeMs = fs.statSync(info.file).mtimeMs;

      if (mtimeMs !== info.mtimeMs) {
        const fileEnums = readFileEnums(info.file);

        enums.forEach((enumInfo, enumName) => {
          if (enumInfo.file !== info.file) return;

          enumInfo.mtimeMs = mtimeMs;
          enumInfo.values = fileEnums?.get(enumName) ?? new Map();
        });
      }
    } catch (_error) {
      // A vanished file keeps its last known values: the next transform retries.
    }
  }

  return info.values.get(member);
};

const rewriteConstEnums = (file: string, code: string, enums: Map<string, EnumInfo>) => {
  const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, false);
  const edits: Edit[] = [];
  const refreshedFiles = new Set<string>();
  const replaceNode = (node: ts.Node, text: string) => {
    edits.push({ start: node.getStart(source), end: node.getEnd(), text });
  };

  const visit = (node: ts.Node) => {
    if (isConstEnum(node) && enums.has(node.name.text)) {
      replaceNode(node, '');
      return;
    }

    if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression)) {
      const literal = takeEnumMemberLiteral(enums, refreshedFiles, node.expression.text, node.name.text);
      if (literal !== undefined) {
        replaceNode(node, literal);
        return;
      }
    }

    if (ts.isElementAccessExpression(node) && ts.isIdentifier(node.expression)) {
      const argument = node.argumentExpression;
      if (argument && (ts.isStringLiteral(argument) || ts.isNoSubstitutionTemplateLiteral(argument))) {
        const literal = takeEnumMemberLiteral(enums, refreshedFiles, node.expression.text, argument.text);
        if (literal !== undefined) {
          replaceNode(node, literal);
          return;
        }
      }
    }

    if (ts.isExportDeclaration(node) && !node.isTypeOnly && node.exportClause && ts.isNamedExports(node.exportClause)) {
      const elements = node.exportClause.elements;
      const enumElements = elements.filter(element => !element.isTypeOnly && enums.has((element.propertyName ?? element.name).text));

      if (enumElements.length) {
        const keptElements = elements.filter(element => !enumElements.includes(element));
        if (!keptElements.length) {
          replaceNode(node, '');
          return;
        }

        const clauses = keptElements.map(element => element.getText(source)).join(', ');
        const fromClause = node.moduleSpecifier ? ` from ${node.moduleSpecifier.getText(source)}` : '';
        replaceNode(node, `export { ${clauses} }${fromClause};`);
        return;
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(source);

  if (!edits.length) return null;

  return edits
    .sort((editA, editB) => editB.start - editA.start)
    .reduce((result, { start, end, text }) => result.slice(0, start) + text + result.slice(end), code);
};

export const constEnumVitePlugin = (): Plugin => {
  let root = process.cwd();
  let enums: Map<string, EnumInfo> | null = null;
  let enumFiles: Set<string> | null = null;
  let enumNamesRegExp: RegExp | null = null;

  return {
    name: 'const-enum-inline',
    enforce: 'pre',
    configResolved(config) {
      root = config.root;
    },
    handleHotUpdate({ file, server }) {
      if (!enumFiles?.has(file)) return;

      // An inlined value is a bare literal in modules the graph does not link to the enum file,
      // so Vite cannot invalidate those importers itself: only a full graph reset refreshes them.
      server.moduleGraph.invalidateAll();
      server.ws.send({ type: 'full-reload' });
    },
    transform(code, id) {
      const file = id.split('?')[0];
      if (!tsFileRegExp.test(file) || file.endsWith('.d.ts') || file.includes('node_modules')) return;

      if (enums === null) {
        const collected = collectEnums(root);
        enums = collected.enums;
        enumFiles = collected.files;
      }

      if (!enums.size) return;

      enumNamesRegExp ??= new RegExp(
        `\\b(?:${[...enums.keys()].map(name => name.replaceAll('$', '\\$')).join('|')})\\b`,
      );
      if (!enumNamesRegExp.test(code)) return;

      const transformed = rewriteConstEnums(file, code, enums);

      if (transformed === null) return;

      return { code: transformed, map: null };
    },
  };
};
