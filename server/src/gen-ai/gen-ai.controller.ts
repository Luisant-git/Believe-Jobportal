import { Controller, Post, UploadedFile, UseInterceptors, Body, Logger, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GenAIService } from './gen-ai.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiConsumes, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('GenAI') // Groups this controller's endpoints under 'GenAI' in Swagger UI
@ApiBearerAuth() // Indicates this controller requires JWT authentication
@Controller('gen-ai')
@UseGuards(AuthGuard('jwt'))
export class GenAIController {
  private readonly logger = new Logger(GenAIController.name);

  constructor(private readonly genAIService: GenAIService) {}

  @Post('generate-content')
  @ApiOperation({ 
    summary: 'Generate content from uploaded file',
    description: 'Upload a file and get AI-generated content based on its contents'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Content successfully generated',
    type: String 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - invalid file format' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - invalid or missing JWT' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Internal server error' 
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to be processed by GenAI',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'The file to upload (PDF, DOCX, TXT, etc.)'
        }
      }
    }
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileExtension = extname(file.originalname);
          const fileName = `${Date.now()}${fileExtension}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async generateContentFromFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    try {
      this.logger.log(`Received file: ${file.originalname}`);
      const content = await this.genAIService.generateContentFromFile(file.path);
      return content;
    } catch (error) {
      this.logger.error('Error in generating content from file', error.stack);
      throw new Error('Failed to generate content from file');
    }
  }
}