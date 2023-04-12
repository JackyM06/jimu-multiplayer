import { ISchemaItem } from '@editor/types';
import mockSchema from './mock';
import { ref } from 'vue';
import { get, set } from 'lodash-es'
import { schemaView } from './utils';

export class SchemaModel {
    
    public static manger = ref(new Map<string, ISchemaItem>())

    public static loadSchema(schema = mockSchema) {
        schema.forEach(this.createModel);
    }

    public static createModel(schemaItem: ISchemaItem) {
        SchemaModel.manger.value.set(schemaItem.eid, schemaItem)
    }

    public static removeModel(eid: string) {
        SchemaModel.manger.value.delete(eid);
    }

    public static getModel(eid: string ) {
        return SchemaModel.manger.value.get(eid)
    }

    public static getModelProp(eid: string, path: string) {
        const model = this.getModel(eid);
        return get((model?.props as any)[path], 'value.value')
    }

    public static setModelProp(eid: string, path: string, value: any) {
        const model = this.getModel(eid);
        return set((model?.props as any)[path], 'value.value', value)
    }

    public static getModelManifest(eid: string) {
        const model = this.getModel(eid);
        return model?.manifest
    }

    public static getAllModelManifest() {
        const all = [];
        for (const iterator of this.manger.value) {
            all.push(iterator[1].manifest)
        }
        return all;
    }

    public static getAllElementManifest() {
        const models = this.getAllModelManifest();
        return  Object.values(models.reduce((res,cur) => {
            res[cur.name] = cur;
            return res;
        }, {} as any)) as (typeof models)
    }
}

SchemaModel.loadSchema();