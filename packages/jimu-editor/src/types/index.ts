import mock from "@editor/models/schema/mock";

export type ArrayOf<T> = T extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type ISchemaItem = ArrayOf<typeof mock>