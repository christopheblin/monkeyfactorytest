import { Test, TestingModule } from '@nestjs/testing';
import { AppController, DemoResponse } from './app.controller';
import { RomanConverterService } from './romanconverter.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [RomanConverterService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('demo', () => {
    it('should return roman date', () => {
      expect(appController.get('2021-02-09')).toEqual(<DemoResponse>{receivedDateStr: '2021-02-09', romanDateStr: 'IX/II/MMXXI'});
    });
  });
});
