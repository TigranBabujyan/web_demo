import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './content/content.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ContentModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
