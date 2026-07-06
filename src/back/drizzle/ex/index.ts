import { SQL, sql, Table } from 'drizzle-orm';
import { PgColumn } from 'drizzle-orm/pg-core';
import { checkIsFunction, checkIsString } from 'shared/utils/checkIs';
import { forEachObjectEntries, objectLength } from 'shared/utils/object.utils';

export * from 'drizzle-orm/pg-core';

export const extractPgSchemaOwnProps = <
  Schema extends SchemaExclusion,
  OmitKey extends keyof Omit<Schema, keyof SchemaExclusion>,
>(
  schema: Schema,
  omitKeys?: OmitKey[],
): Omit<Schema, keyof SchemaExclusion | OmitKey> => {
  const { $inferInsert, $inferSelect, _, enableRLS, getSQL, shouldOmitSQLParens, ...schemaRest } = schema;

  if (objectLength(omitKeys)) {
    const keysSet = new Set(omitKeys);
    forEachObjectEntries(schemaRest, key => {
      if (keysSet.has(key as never)) delete schemaRest[key as never];
    });
  }

  return schemaRest as never;
};

export const enum PgCheckFieldMode {
  RemoveIfNull,
  Remove,
}

export const makePgCheckedSelectSqlRaw = <const Schema extends Table, const CheckDict extends Record<string, unknown>>(
  schema: Schema,
  checkDict: CheckDict &
    Partial<{
      [K in keyof Schema as Schema[K] extends PgColumn ? K : never]:
        | PgCheckFieldMode
        | (K extends string
            ? (columnName: `"${K}"`, nullExceptor: `"${K}"IS NULL `) => `${Operator}${string}`
            : PgCheckFieldMode)
        | `${OrOperator}${string}`;
    }>,
) => {
  const protectedProps: string[] = [];
  const excludableProps: string[] = [''];

  forEachObjectEntries(extractPgSchemaOwnProps(schema), (key, column) => {
    const columnName = `"${(column as { name: string }).name}"` as const;
    const columnKeyWitnName = `'${key as string}',${columnName}` as const;
    const nullExceptor = `${columnName}IS NULL ` as const;

    if (key in checkDict) {
      const checkScalar = checkDict[key as keyof typeof checkDict];
      let colQuery;

      if (checkIsString(checkScalar)) {
        if (checkScalar[0] === '!') colQuery = checkScalar.slice(1);
        else {
          let customQuery;

          if (checkScalar.startsWith(lenOperator)) {
            const columnType = `${(column as { dataType: string }).dataType}`;
            const slicedCol = checkScalar.slice(objectLength(lenOperator));

            if (columnType === 'json') {
              customQuery = `((jsonb_typeof(${columnName})='array'AND jsonb_array_length(${columnName})${slicedCol})OR(jsonb_typeof(${columnName})='object'AND(SELECT count(*)FROM jsonb_object_keys(${columnName}))${slicedCol}))`;
            } else if (columnType === 'array') {
              customQuery = `cardinality(${columnName})${slicedCol}`;
            } else if (columnType === 'string') {
              customQuery = `length(${columnName})${slicedCol}`;
            }
          } else {
            customQuery = `${columnName}${checkScalar}`;
          }

          colQuery = `${nullExceptor}${customQuery ? `OR ${customQuery}` : ''}`;
        }
      } else if (checkIsFunction(checkScalar)) colQuery = checkScalar(columnName, nullExceptor);
      else if (checkScalar === PgCheckFieldMode.RemoveIfNull) colQuery = nullExceptor;

      if (colQuery)
        excludableProps.push(
          `(CASE WHEN ${colQuery} THEN'{}'::jsonb ELSE jsonb_build_object(${columnKeyWitnName})END)`,
        );
    } else {
      protectedProps.push(columnKeyWitnName);
    }
  });

  return sql.raw(
    `jsonb_build_object(${protectedProps.join(',')})${objectLength(excludableProps) > 1 ? excludableProps.join('||') : ''}`,
  ) as SQL<InferCheckedSchema<Schema['$inferSelect'], CheckDict>>;
};

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

type InferCheckedSchema<SchemaSelect, CheckDict extends Record<keyof SchemaSelect, unknown>> = {
  [K in keyof SchemaSelect]: CheckDict[K] extends PgCheckFieldMode.Remove ? never : SchemaSelect[K];
};

type SchemaExclusion = {
  $inferInsert?: unknown;
  $inferSelect?: unknown;
  _?: unknown;
  enableRLS?: unknown;
  getSQL?: unknown;
  shouldOmitSQLParens?: unknown;
};

const lenOperator = 'len';

// ! for own schema
type Operator = 'AND' | 'OR' | 'NOT' | '!';
type OrOperator = `${typeof lenOperator | ''}${`${'>' | '<'}${'=' | ''}` | '=' | '!='}`;
