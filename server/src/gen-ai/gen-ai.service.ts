import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs-extra';
import * as pdfParse from 'pdf-parse';
import * as mammoth from 'mammoth';
import * as path from 'path';

@Injectable()
export class GenAIService {
  private readonly logger = new Logger(GenAIService.name);
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      this.logger.error(
        'GOOGLE_API_KEY is not defined in the environment variables.',
      );
      throw new Error('Missing Google API key.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateContentFromFile(filePath: string): Promise<string> {
    try {
      const text = await this.extractTextFromFile(filePath);
      const promptPlusText = `,Prompt : i Given Resume data ,
       Important : i want only jason formate only i want 7 data only no need any and ignore give exact like this json dont give any extra details if the data is not from the text give empty '' {
I want data JSON Formate like exact this
 {
  firstName: '',
  lastName: '',
  email: '',
  secondaryEmail: '',
  currentEmployer: '',
  current_Job_Title: '',
  currentSalary: '',
  expectedSalary: '',
  skype_ID: '',
  linkedIn_Url: '',
  street: '',
  facebook_Url: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  additionalInfo: '',
  phone: '',
  mobile: '',
  skilles: '',
  experience_in_Years: '',
  salutation: '',
  fullname: '',
  highest_Qualification_Held: '',
  twitter: ''
} 
      note Resume text: ${text}`;
      return this.generateContentAsync(promptPlusText);
    } catch (error) {
      this.logger.error('Error generating content from file', error.stack);
      throw new Error('Failed to generate content from file');
    }
  }

  async generateContentAsync(prompt: string): Promise<any> {
    try {
      // Generate content from the AI model
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });
      const result = await model.generateContent(prompt);

      // Extract raw content
      const content = result.response.text() || '';
      console.log('Raw AI content:', content);

      // Clean and standardize the content
      const cleanedContent = content
        .replace(/```json|```/g, '') // Remove code block markers
        .replace(/^\s*[\r\n]+|[\r\n]+$/g, '') // Remove leading and trailing newlines
        .replace(/,\s*([\]}])/g, '$1') // Remove trailing commas
        .replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3') // Quote object keys
        .trim();

      console.log('Cleaned AI content:', cleanedContent);

      // Parse and return JSON content
      const jsonContent = JSON.parse(cleanedContent);
      console.log('Parsed JSON content:', jsonContent);
      return jsonContent;
    } catch (error) {
      console.error('Error generating AI content:', error);
      throw error;
    }
  }

  async extractTextFromFile(filePath: string): Promise<string> {
    const fileExtension = filePath.split('.').pop()?.toLowerCase();
    switch (fileExtension) {
      case 'pdf':
        return this.extractTextFromPDF(filePath);
      case 'docx':
        return this.extractTextFromDocx(filePath);
      case 'txt':
        return this.extractTextFromTxt(filePath);
      default:
        throw new Error(`Unsupported file type: ${fileExtension}`);
    }
  }

  private async extractTextFromPDF(filePath: string): Promise<string> {
    try {
      const fileBuffer = await fs.readFile(filePath);
      const data = await pdfParse(fileBuffer);
      return data.text;
    } catch (error) {
      this.logger.error('Error extracting text from PDF', error.stack);
      throw error;
    }
  }

  private async extractTextFromDocx(filePath: string): Promise<string> {
    try {
      const fileBuffer = await fs.readFile(filePath);
      const { value } = await mammoth.extractRawText({ buffer: fileBuffer });
      return value;
    } catch (error) {
      this.logger.error('Error extracting text from DOCX', error.stack);
      throw error;
    }
  }

  private async extractTextFromTxt(filePath: string): Promise<string> {
    try {
      return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      this.logger.error('Error extracting text from TXT', error.stack);
      throw error;
    }
  }
}
