import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum NotificationType {
  INFO = 'INFO',
  ALERT = 'ALERT',
  REMINDER = 'REMINDER',
}

export enum ReadStatus {
  UNREAD = 'unread',
  READ = 'read',
}

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsString()
  userId: string;
}
