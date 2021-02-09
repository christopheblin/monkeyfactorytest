import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RomanConverterService } from './romanconverter.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [RomanConverterService],
})
export class AppModule {}
