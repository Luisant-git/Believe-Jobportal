import { Module } from '@nestjs/common';
import { GenAIController } from './gen-ai.controller';
import { GenAIService } from './gen-ai.service';


@Module({
  providers: [GenAIService],
  controllers: [GenAIController]
})
export class GenAiModule {}
