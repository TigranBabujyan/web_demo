import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { DbModule } from '../db/db.module';

@Module({
    imports: [DbModule],
    controllers: [ContentController],
    providers: [ContentService],
})
export class ContentModule { }
