# Enquiry API

## Overview
This module handles enquiry form submissions from the website contact form. It stores enquiry data in the database and sends email notifications.

## Endpoints

### POST /enquiry
Creates a new enquiry and sends email notification.

**Request Body:**
```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "mobileno": "1234567890",
  "queries": "I'm interested in job opportunities"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "data": {
    "id": "uuid",
    "username": "John Doe",
    "email": "john@example.com",
    "mobileno": "1234567890",
    "queries": "I'm interested in job opportunities",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /enquiry
Retrieves all enquiries with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

## Email Notification
When an enquiry is submitted, an email is automatically sent to `enquiry@believejobs.com` with the enquiry details.