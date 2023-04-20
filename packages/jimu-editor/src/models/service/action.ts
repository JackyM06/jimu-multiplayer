import { SchemaModel } from "../schema";

enum NET {
    PORT = 3000,
    BASE = ''
}

// const BASE_URL = `${location.protocol}//${location.hostname}:${NET.PORT}${NET.BASE}`;
const BASE_URL = `${NET.BASE}`;

export class ServiceAction {

    public static async post(url: string, body: any) {
        const response = await fetch(BASE_URL + url, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.json();
    }

    public static async patch(url: string, body: any) {
        const response = await fetch(BASE_URL + url, {
            method: 'PATCH',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.json();
    }

    public static async get(url: string) {
        const response = await fetch(BASE_URL + url, {
            method: 'GET',
        })
        return response.json();
    }

    public static async fetchSchema() {
        const schema = await this.get(`/page/${1}`);
        SchemaModel.loadSchema(schema)
    }

    public static async  saveSchema() {
        return this.patch(`/page/${1}`, SchemaModel.toSchemaJson())
    }

    public static async preconnect() {
        return this.get('/signaling/preconnect')
    }
}

ServiceAction.fetchSchema()