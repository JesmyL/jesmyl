import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import type { Plugin } from 'vite';

type EnumMemberValues = Map<string, string>;
type EnumInfo = { file: string; values: EnumMemberValues };
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

  const scanFile = (file: string) => {
    readFileEnums(file)?.forEach((values, name) => enums.set(name, { file, values }));
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

  return enums;
};

const takeEnumMemberLiteral = (
  enums: Map<string, EnumInfo>,
  refreshedNames: Set<string>,
  name: string,
  member: string,
) => {
  let literal = enums.get(name)?.values.get(member);

  // The snapshot is collected once per dev server, so a member added afterwards is
  // unknown here and its import would survive into the code of a module whose enum
  // declaration is stripped. Re-read the declaring file on the first miss instead.
  if (literal === undefined && enums.has(name) && !refreshedNames.has(name)) {
    refreshedNames.add(name);

    const info = enums.get(name);
    const values = info && readFileEnums(info.file)?.get(name);

    if (info && values) {
      info.values = values;
      literal = values.get(member);
    }
  }

  return literal;
};

const rewriteConstEnums = (file: string, code: string, enums: Map<string, EnumInfo>) => {
  const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, false);
  const edits: Edit[] = [];
  const refreshedNames = new Set<string>();
  const replaceNode = (node: ts.Node, text: string) => {
    edits.push({ start: node.getStart(source), end: node.getEnd(), text });
  };

  const visit = (node: ts.Node) => {
    if (isConstEnum(node) && enums.has(node.name.text)) {
      replaceNode(node, '');
      return;
    }

    if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression)) {
      const literal = takeEnumMemberLiteral(enums, refreshedNames, node.expression.text, node.name.text);
      if (literal !== undefined) {
        replaceNode(node, literal);
        return;
      }
    }

    if (ts.isElementAccessExpression(node) && ts.isIdentifier(node.expression)) {
      const argument = node.argumentExpression;
      if (argument && (ts.isStringLiteral(argument) || ts.isNoSubstitutionTemplateLiteral(argument))) {
        const literal = takeEnumMemberLiteral(enums, refreshedNames, node.expression.text, argument.text);
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
  let enumNamesRegExp: RegExp | null = null;

  return {
    name: 'const-enum-inline',
    enforce: 'pre',
    configResolved(config) {
      root = config.root;
    },
    transform(code, id) {
      const file = id.split('?')[0];
      if (!tsFileRegExp.test(file) || file.endsWith('.d.ts') || file.includes('node_modules')) return;

      enums ??= collectEnums(root);
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
