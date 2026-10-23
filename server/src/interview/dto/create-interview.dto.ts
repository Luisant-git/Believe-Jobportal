// src/interview/dto/create-interview.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsBoolean,
  IsInt,
} from 'class-validator';

// Define enums locally if Prisma isn't exposing them
export enum InterviewType {
  TECHNICAL = 'TECHNICAL',
  HR = 'HR',
  MANAGERIAL = 'MANAGERIAL',
  FINAL = 'FINAL',
}

export enum InterviewRating {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  AVERAGE = 'AVERAGE',
  POOR = 'POOR',
}

export enum InterviewFeedback {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
}

export enum InterviewStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  RESCHEDULED = 'RESCHEDULED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum InterviewMode {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  PHONE = 'PHONE',
  VIDEO = 'VIDEO',
}

export enum InterviewRound {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  FINAL = 'FINAL'
}

export class CreateInterviewDto {
  @ApiProperty({
    example: '2023-12-15',
    description: 'Date of the interview in YYYY-MM-DD format'
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    example: '14:30:00',
    description: 'Time of the interview in HH:MM:SS format'
  })
  @IsDateString()
  time: string;

  @ApiProperty({
    example: 'Acme Corp Headquarters, 123 Main St, New York, NY',
    description: 'Physical location for in-person interviews'
  })
  @IsString()
  location: string;

  @ApiProperty({
    enum: InterviewType,
    example: InterviewType.TECHNICAL,
    description: 'Type of interview being conducted'
  })
  @IsEnum(InterviewType)
  type: InterviewType;

  @ApiProperty({
    enum: InterviewRating,
    example: InterviewRating.GOOD,
    description: 'Overall rating of the candidate performance'
  })
  @IsEnum(InterviewRating)
  rating: InterviewRating;

  @ApiProperty({
    enum: InterviewFeedback,
    example: InterviewFeedback.POSITIVE,
    description: 'General feedback sentiment about the candidate'
  })
  @IsEnum(InterviewFeedback)
  feedback: InterviewFeedback;

  @ApiProperty({
    enum: InterviewStatus,
    example: InterviewStatus.SCHEDULED,
    description: 'Current status of the interview process'
  })
  @IsEnum(InterviewStatus)
  interviewStatus: InterviewStatus;

  @ApiProperty({
    required: false,
    example: 'Candidate showed strong problem-solving skills but needs improvement in system design.',
    description: 'Detailed notes from the interviewers'
  })
  @IsOptional()
  @IsString()
  interviewNotes?: string;

  @ApiProperty({
    required: false,
    example: 'Candidate requested follow-up about benefits package.',
    description: 'Additional administrative notes'
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID of the associated job application'
  })
  @IsString()
  applicationId: string;

  @ApiProperty({
    required: false,
    example: 'Jane Smith',
    description: 'Name of the interviewer'
  })
  @IsOptional()
  @IsString()
  interviewerName?: string;

  @ApiProperty({
    required: false,
    example: 'jane.smith@company.com',
    description: 'Email of the interviewer'
  })
  @IsOptional()
  @IsString()
  interviewerEmail?: string;

  @ApiProperty({
    required: false,
    enum: InterviewMode,
    example: InterviewMode.VIDEO,
    description: 'Medium through which interview is conducted'
  })
  @IsOptional()
  @IsEnum(InterviewMode)
  interviewMode?: InterviewMode;

  @ApiProperty({
    required: false,
    example: 'https://meet.google.com/xyz-abc-def',
    description: 'Meeting link for virtual interviews'
  })
  @IsOptional()
  @IsString()
  meetingLink?: string;

  @ApiProperty({
    required: false,
    example: 60,
    description: 'Planned duration of interview in minutes'
  })
  @IsOptional()
  @IsInt()
  durationMinutes?: number;

  @ApiProperty({
    required: false,
    enum: InterviewRound,
    example: InterviewRound.SECOND,
    description: 'Which round of interviews this represents'
  })
  @IsOptional()
  @IsEnum(InterviewRound)
  round?: InterviewRound;

  @ApiProperty({
    required: false,
    example: '2023-12-20',
    description: 'New date if interview was rescheduled'
  })
  @IsOptional()
  @IsString()
  rescheduledDate?: string;

  @ApiProperty({
    example: false,
    description: 'Whether the interview has been completed'
  })
  @IsBoolean()
  isCompleted: boolean;
}