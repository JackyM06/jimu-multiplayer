import { Injectable } from '@nestjs/common';
import mock from 'src/config/schema';
const pageMap: Record<number, string> = { 1: JSON.stringify(mock) };

@Injectable()
export class PageService {
  create(schema: string) {
    pageMap[Math.max(...Object.keys(pageMap).map(Number)) + 1] = schema;
  }

  findAll() {
    // return `This action returns all page`;
    return Object.keys(pageMap).map((key) => ({
      id: key,
      schema: pageMap[key],
    }));
  }

  findOne(id: number) {
    return pageMap[id];
  }

  update(id: number, schema: string) {
    pageMap[id] = JSON.stringify(schema);
    return {};
  }

  remove(id: number) {
    return `This action removes a #${id} page`;
  }
}
