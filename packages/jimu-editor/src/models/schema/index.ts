import { ISchemaItem } from '@editor/types';
import mockSchema from './mock';
import { ref } from 'vue';
import { get, set } from 'lodash-es'

export class SchemaModel {
    
    public static manger = ref(new Map<string, ISchemaItem>())

    public static loadSchema(schema = mockSchema) {
        schema.forEach(this.addModel);
    }

    public static addModel(schemaItem: ISchemaItem) {
        SchemaModel.manger.value.set(schemaItem.eid, schemaItem)
    }

    public static removeModel(eid: string) {
        SchemaModel.manger.value.delete(eid);
    }

    public static getModelParent(eid: string) {
        const model = this.getModel(eid);
        return model?.parent || 'app';
    }

    public static getModel(eid: string ) {
        return SchemaModel.manger.value.get(eid)
    }

    public static getModelProp(eid: string, path: string) {
        const model = this.getModel(eid);
        if(!model) {
            return;
        }
        return get((model?.props as any)[path], 'value.value')
    }

    public static setModelProp(eid: string, path: string, value: any) {
        const model = this.getModel(eid);
        if(!model) {
            return;
        }
        if(!(model.props as any)[path]) {
            (model.props as any)[path] = {}
        }
        set((model?.props as any)[path], 'value.value', value)
    }

    public static getModelManifest(eid: string) {
        const model = this.getModel(eid);
        return model?.manifest
    }
}

SchemaModel.loadSchema();