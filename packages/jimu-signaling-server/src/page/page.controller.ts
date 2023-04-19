import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { PageService } from './page.service';

@Controller('rest/page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  create(@Body() schema: string) {
    return this.pageService.create(schema);
  }

  @Get()
  findAll() {
    return this.pageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() schema: string) {
    return this.pageService.update(+id, schema);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageService.remove(+id);
  }
}
